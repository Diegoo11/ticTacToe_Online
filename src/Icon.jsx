/* eslint-disable react/no-unstable-nested-components */
import { Switch } from '@nextui-org/react';
import MoonIcon from './assets/circle.svg';
import SunIcon from './assets/cruz.svg';

function Icon({ setIcon }) {
  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      onChange={(e) => { setIcon(e.target.checked ? 'X' : 'O'); }}
      thumbIcon={({ isSelected }) => (isSelected ? (
        <img src={SunIcon} alt="Cruz" width={20} />
      ) : (
        <img src={MoonIcon} alt="Circle" width={20} />
      ))}
    >
      <p className="text-white text-xl">Select Ico</p>
    </Switch>
  );
}

export default Icon;
