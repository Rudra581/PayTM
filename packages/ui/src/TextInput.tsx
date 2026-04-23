export const TextInput = ({
  placeholder,
  onChange,
  label,
  value,
  disabled,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};
