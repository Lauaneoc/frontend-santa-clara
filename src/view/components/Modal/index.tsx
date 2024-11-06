import { ReactNode } from 'react';
import {
    Dialog,
    DialogCloseButton,
    DialogContent,
    DialogHeader,
    DialogVariantsProps
} from '../@composition/Dialog';
import { cn } from '../../../@shared/utils/cn';
import { motion } from 'framer-motion'; // Importe o motion

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
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: open ? 1 : 0,
                    scale: open ? 1 : 0.95,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    scale: { type: "spring", stiffness: 500, damping: 30 },
                }}
            >
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
            </motion.div>
        </Dialog>
    );
}
