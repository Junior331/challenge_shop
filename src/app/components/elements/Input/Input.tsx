import { Props } from "./@types";

export const Input = ({
  label,
  error,
  children,
  linkLabel,
  helperText,
  ...res
}: Props) => {
  return (
    <label className="form-control w-full">
      <div className="label relative">
        {label && <span className="label-text">{label}</span>}
        {linkLabel && (
          <span className="label-text-alt absolute z-10 right-0 text-link cursor-pointer">
            {linkLabel}
          </span>
        )}
      </div>
      <div className="input input-bordered flex items-center justify-between gap-2 bg-transparent">
        <input className="bg-transparent label-text flex-1" {...res} />
        {children && (
          <div onMouseDown={(e) => e.preventDefault()}>{children}</div>
        )}
      </div>

      {error && (
        <div className="label">
          <span className="label-text-alt text-error">{helperText}</span>
        </div>
      )}
    </label>
  );
};
