DROP VIEW IF EXISTS v_entries;

CREATE VIEW v_entries WITH (security_invoker) AS
  SELECT e.order_id,
    e.event_id,
    i.category,
    o.date,
    o.payment_method,
    o.payment_status,
    o.payment_id,
    e.first_name,
    e.last_name,
    e.tin,
    EXTRACT(year FROM e.birth_date) AS birth_year,
    e.gender,
    e.team,
    e.email,
    e.phone_number
    FROM entries e
      INNER JOIN orders o ON e.order_id = o.id
      INNER JOIN order_items oi ON e.order_item_id = oi.id
      INNER JOIN items i ON oi.item_id = i.id
  WHERE o.payment_status = 'paid'::text OR (o.payment_method = 'cash'::text AND o.payment_status = 'pending'::text)
  ORDER BY e.last_name, e.first_name;

  DROP VIEW IF EXISTS v_entries_public;

  CREATE VIEW v_entries_public WITH (security_invoker) AS
    SELECT e.event_id,
      e.first_name,
      e.last_name,
      EXTRACT(year FROM e.birth_date) AS birth_year,
      e.gender,
      e.team
    FROM entries e
      INNER JOIN orders o ON e.order_id = o.id
      INNER JOIN order_items oi ON e.order_item_id = oi.id
    WHERE o.payment_status = 'paid'::text OR (o.payment_method = 'cash'::text AND o.payment_status = 'pending'::text)
    ORDER BY e.last_name, e.first_name;

  --ALTER VIEW v_entries OWNER TO authenticated;

DROP VIEW IF EXISTS v_users;

CREATE VIEW v_users WITH (security_invoker) AS
  SELECT U.*,
    UR.role,
    array_remove(array_agg(UPG.promoter_id), NULL) as promoters,
    array_remove(array_agg(UEG.event_id), NULL) as events
  FROM public.users U
  LEFT JOIN public.user_roles UR ON U.id = UR.user_id
  LEFT JOIN public.user_promoter_grants UPG ON U.id = UPG.user_id
  LEFT JOIN public.user_event_grants UEG ON U.id = UEG.user_id
  GROUP BY U.id, UR.role
  ORDER BY UR.role DESC, U.last_name, U.first_name;