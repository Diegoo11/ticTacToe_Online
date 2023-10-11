import { Snippet } from '@nextui-org/react';

export default function InvitationLink({ gameId }) {
  return (
    <div className="flex flex-col gap-4 font-semibold text-center">
      <div className="flex flex-col gap-2">
        <span>Comparte el link para jugar!</span>

      </div>
      <div className="flex flex-col gap-2">
        <span>O pasales el codigo del juego</span>
        <Snippet className="w-30">{gameId}</Snippet>
      </div>
    </div>
  );
}
