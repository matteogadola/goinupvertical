'use client';

import { Suspense, useEffect, useState } from 'react'
import { dt } from '@/lib/date'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import DownloadCsv from './download-csv'
import { createClient } from '@/lib/supabase-auth-browser'
import { Order, OrderItem } from '@/types/orders';
import { sendConfirmationMail } from '@/lib/mail';
import { Attachment } from '@/types/events';
import { PlusIcon, SettingIcon, TrashIcon } from '@/app/components/icons';
import AttachmentDialog from './attachment-dialog';

type Props = {
  className?: string;
  attachments: Attachment[] | undefined;
}

interface State {
  attachments: Attachment[] | undefined;
  isDialogOpen: boolean;
  selectedAttachment: Attachment | undefined;
}

export default function AttachmentsList({ attachments, className }: Props) {

  const [state, setState] = useState<State>({
    attachments,
    isDialogOpen: false,
    selectedAttachment: undefined
  });

  useEffect(() => setState({ ...state, attachments }), [attachments]);
  // in realtà dovresti mandarlo al padre...
  // il pade potrebbe essere cacheato...

  const onCreate = () => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: undefined })
  }

  const onUpdate = (attachment: Attachment) => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: attachment })
  }

  const onDelete = (attachment: Attachment) => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: attachment })
  }

  const onResult = (attachment: Attachment) => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: attachment })
  }

  const closeDialog = () => {
    setState({ ...state, isDialogOpen: false, selectedAttachment: undefined })
  }

  return (
    <Suspense fallback={<Spinner />}>
      { state.isDialogOpen && <AttachmentDialog attachment={state.selectedAttachment} onResult={() => {}} onClose={closeDialog} /> }

      <section className={classNames(className, "")}>
        <div className="flex items-center space-x-4">
          <h3 className="overtitle">Allegati</h3>
          <button onClick={onCreate} className="button-icon"><PlusIcon /></button>
        </div>

        { !!attachments?.length &&
          <div className="mt-4">

            <table className="text-sm">
              <thead>
                <tr>
                  <td className="pr-5 border-b py-2">TIPO</td>
                  <td className="pr-10 border-b py-2">NOME</td>
                  <td className="pr-10 border-b py-2">URL</td>
                  <td className="pr-10 border-b py-2"></td>
                </tr>
              </thead>
              <tbody>
              { attachments.map((attachment, index) =>
                <tr key={index} className="border-b">
                  <td className="pr-10 py-2">{attachment.type}</td>
                  <td className="pr-10 py-2 whitespace-nowrap">{attachment.name}</td>
                  <td className="pr-10 py-2">{attachment.url}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button onClick={() => onUpdate(attachment)}><SettingIcon /></button>
                      <button onClick={() => onDelete(attachment)}><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        }
      </section>
    </Suspense>
  )
}
