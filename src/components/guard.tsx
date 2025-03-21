'use server'

import { Role } from '@/types/user';

type Props = {
  hasRole: Role
}

export default function Guard({ hasRole }: Partial<Props>) {


  return (
    <>
    
        <div className="">
          Nessun elemento nel carrello
        </div>
    </>
  );


}
