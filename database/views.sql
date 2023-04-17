DROP VIEW IF EXISTS v_entries;

CREATE OR REPLACE VIEW v_entries WITH (security_invoker) AS
  SELECT e.order_id,
    e.event_id,
    i.category,
    o.date,
    o.payment_method,
    o.payment_status,
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

  --ALTER VIEW v_entries OWNER TO authenticated;