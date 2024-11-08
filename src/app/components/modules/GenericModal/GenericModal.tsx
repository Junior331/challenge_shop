import { Props } from "./@types";
import { Button } from "../../elements";

export const GenericModal = ({
  open,
  loading,
  children,
  handleClose,
  handleConfirm,
  textButtonPrimary,
  textButtonSecondary,
}: Props) => {
  return (
    <dialog className="modal" open={open}>
      <div className="modal-box bg-card">
        {children}

        <div className="mt-5 w-full flex gap-2 items-center justify-end">
          <Button
            type="button"
            onClick={handleClose}
            className="btn bg-card min-w-28 text-red-600 hover:bg-background border divide-solid border-border"
          >
            {textButtonSecondary || "Cancel"}
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            onClick={handleConfirm}
            className="btn min-w-28 bg-link border-none text-white hover:bg-link-foreground"
          >
            {textButtonPrimary || "Save"}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
