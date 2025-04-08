import { dt } from "@/utils/date";
import clsx from "clsx";
import Link from "next/link";
import { JSX } from "react";

/*
devo gestire se aperta (mostrare fino a quando)
se non ancora aperta (mostrare da quando)
se chiusa (mostrare possibilità di farlo alla partenza)

ISCRIZIONI: Aperte fino al
ISCRIZIONI: Chiuse
ISCRIZIONI: Disponibili alla partenza

SE date è passato non mostro nulla
*/
export default function EventEntryStatus({ event }: { event: any }) {

  if (event.status === 'close') {
    return <span className="">Iscrizioni chiuse</span>
  } else if (event.status === 'open') {
    // per ora no supporta altri modi
    if (event.products?.length === 1) {
      const product = event.products[0]

      // poi supporta sold out ecc
      if (product.status !== 'open') {
        return <span className="">Iscrizioni chiuse</span>
      }

      const endSaleDate = product.end_sale_date
        ? dt(product.end_sale_date)
        : dt(event.date).subtract(46, 'hours')

      if (dt(endSaleDate).isBefore()) {
        return (
          <div className="flex flex-col space-x-2">
            <span className="">Iscrizioni chiuse</span>
            <span className="block text-gray-700 text-sm">disponibili alla partenza</span>
          </div>
        )
      }

      if (!!product.start_sale_date && dt(product.start_sale_date).isAfter()) {
        const startSaleDate = dt(product.start_sale_date)

        return (
          <div className="flex flex-col space-x-2">
            <span className="">Iscrizioni chiuse</span>
            <span className="block text-gray-700 text-sm">disponibili da {startSaleDate.format('dddd D MMMM')} alle {startSaleDate.format('HH:mm')}</span>
          </div>
        )
      }

      return (
        <div className="flex flex-col space-x-2">
          <span className="">Iscrizioni <span className="highlighted">aperte</span></span>
          <span className="block text-gray-700 text-sm">fino a {endSaleDate.format('dddd D MMMM')} alle {endSaleDate.format('HH:mm')}</span>
        </div>
      )
    }
  }

  return <></>
}
