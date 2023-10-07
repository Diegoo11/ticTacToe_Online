/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-key */
import { useMutation } from '@apollo/client';
import { played } from './operations/mutation';

const icons = {
  0: ' ',
  1: 'X',
  2: 'O',
};

function Table({ icon, tableObj }) {
  const [updatePlayed] = useMutation(played);
  const table = [
    [
      tableObj.p_0,
      tableObj.p_1,
      tableObj.p_2,
    ],
    [
      tableObj.p_3,
      tableObj.p_4,
      tableObj.p_5,
    ],
    [
      tableObj.p_6,
      tableObj.p_7,
      tableObj.p_8,
    ],
  ];
  const playedClick = (x, y) => {
    updatePlayed({ variables: { play: (3 * x + y), ico: icon === 'X' ? 1 : 2 } });
  };

  return (
    <div className="flex flex-col gap-3 justify-between bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-64 w-60 sm:h-96 sm:w-96 m-10">
      {table.map((row, i) => (
        <div className="flex gap-3 justify-between">
          {row.map((btn, j) => (
            <button type="button" disabled={btn !== 0} onClick={() => playedClick(i, j)} className="bg-[#111926] h-20 w-20 text-3xl sm:h-32 sm:w-32 sm:text-5xl font-bold text-white">
              {icons[btn]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
