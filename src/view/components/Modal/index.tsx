import { ReactNode } from 'react';
import {
    Dialog,
    DialogCloseButton,
    DialogContent,
    DialogHeader,
    DialogVariantsProps
} from '../@composition/Dialog';
import { cn } from '../../../@shared/utils/cn';

export type ModalProps = {
    children: ReactNode;
    className?: string;
    title?: string;
    open: boolean;
    onClose: () => void;
    rightAction?: ReactNode;
    classNameHeader?: string;
    containerClassName?: string;
    classNameForeground?: string;
    headerContent?: ReactNode;
    position?: DialogVariantsProps;
};

export function Modal({
    open,
    onClose,
    title,
    className,
    children,
    rightAction,
    position,
    classNameHeader,
    containerClassName,
    classNameForeground,
    headerContent
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent classNameForeground={classNameForeground} className={className} position={position}>
                <DialogHeader className={classNameHeader}>
                    <DialogCloseButton />

                    {title && <span className="text-lg font-medium">{title}</span>}

                    {rightAction && (
                        <div className="flex items-center justify-end flex-1">
                            {rightAction}
                        </div>
                    )}
                    {headerContent}
                </DialogHeader>

                <div
                    className={cn(
                        'h-[95%] max-h-[95%] overflow-y-auto',
                        containerClassName,
                    )}
                >
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}