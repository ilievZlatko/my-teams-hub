'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  title: string
  buttonText?: string
  buttonIcon?: string
  image?: string
  isLoading?: boolean
  handleClick?: () => void
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  children,
  title,
  buttonText,
  buttonIcon,
  image,
  isLoading = false,
  handleClick,
}: ModalProps) => {
  const t = useTranslations('page')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="flex w-full max-w-[520px] flex-col rounded-xl bg-mth-white-50 text-mth-grey-blue-700 max-sm:w-11/12"
      >
        <div className="flex flex-col gap-3 *:rounded-xl *:font-poppins *:font-normal">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="dialog image" width={72} height={72} />
            </div>
          )}
          <DialogTitle className="my-3 px-2 text-center text-[16px] leading-[24px]">
            {title}
          </DialogTitle>

          {children}

          <Button
            onClick={onClose}
            variant="tertiary-outline"
            disabled={isLoading}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{' '}
            &nbsp;
            {t('cancel')}
          </Button>

          <Button onClick={handleClick} disabled={isLoading}>
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{' '}
            &nbsp;
            {buttonText || t('confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
