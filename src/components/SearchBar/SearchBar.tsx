import type { ChangeEvent } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
  buttonLabel?: string;
};

export function SearchBar(props: Props) {
  const {
    value,
    onChange,
    onSearch,
    placeholder = 'Enter FULL! Pokémon name...',
    buttonLabel = 'Search',
  } = props;
  return (
    <div style={{ marginBottom: '20px' }}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: '250px' }}
      />
      <Button onClick={onSearch} className="regularButton">
        {buttonLabel}
      </Button>
    </div>
  );
}
