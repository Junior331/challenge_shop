import { Props } from "./@types";

export const Select = ({ title, options, defaultOption, ...res }: Props) => {
  return (
    <label className="form-control w-full max-w-32">
      {title && (
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
      )}
      <select
        {...res}
        className="select select-bordered bg-card w-full  btn btn-outline hover:bg-accent text-text"
      >
        {defaultOption && (
          <option value="" defaultValue="">
            {defaultOption}
          </option>
        )}
        {options && (
          <>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
    </label>
  );
};
