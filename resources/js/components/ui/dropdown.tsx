interface iDropdownProps {
    id: string;
    name: string;
    placeholder?: string;
    items: Array<Required<{ id: number; name: string; }>>;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
    id,
    name,
    items,
    placeholder,
    value = '',
    onChange: handleChange,
}: iDropdownProps) {
    return (
        <select id={id} name={name} value={value} onChange={handleChange} required className="input rounded-md border border-gray-300 focus:outline-none focus:ring-2 px-3 py-1 shadow-xs text-base focus:ring-primary/50">
            {placeholder && <option value="">{placeholder}</option>}
            {items.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
        </select>
    )
}