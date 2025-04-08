import { dt } from "@/utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntry from "./event-entry";

export default async function EventProducts({ event }: { event: any }) {

  if (['race', 'serie'].includes(event.type)) {
    if (!event.products?.length) {
      return <></>
    } else if (event.products?.length === 1) {
      const product = event.products[0]

      if (product.status !== 'open') {
        return <span className="">Iscrizioni chiuse</span>
      }

      /*const endSaleDate = product.end_sale_date
        ? dt(product.end_sale_date)
        : dt(event.date).subtract(46, 'hours')

      if (dt(endSaleDate).isBefore()) {
        return (
          <div className="flex flex-col space-x-2">
            <span className="">Iscrizioni chiuse</span>
            <span className="block text-gray-700 text-sm">disponibili alla partenza</span>
          </div>
        )
      }*/

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
        <EventEntry event={event} product={event.products[0]} />
      )

    } else {
      // son più di uno...per la gara non dovrebbe essere possibile
    }
  }
  return <></>
}
