import {useFormContext} from "react-hook-form";

import {FileStateObject} from "../types";
import {ArchiveSvg} from "../../../../../components/icons/archive";

interface DeleteButtonProps extends FileStateObject {
  fieldName: string
}

export const DeleteButton = (props: DeleteButtonProps) => {
    const ctx = useFormContext();
    return (
      <button
        type="button"
        data-testid={`delete-${props.fileName}`}
        className={`ml-4 ${ctx.formState.isSubmitting ? 'cursor-disabled' : 'text-red-500'}`}
        disabled={ctx.formState.isSubmitting}
        onClick={() => {
          ctx.setValue(
            props.fieldName,
            // map through existing and update statuss
            ctx
              .getValues(props.fieldName).map((val: FileStateObject) =>
                val.id === props.id
                  ? Object.assign({}, val, {status: 'PENDING_REMOVAL'} as Pick<FileStateObject, 'status'>)
                  : val
              )
          );
        }}
      >
        <span className="sr-only">Delete {props.fileName}</span>
        <ArchiveSvg />
      </button>
    )
}