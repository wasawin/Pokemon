import { MdOutlineCatchingPokemon } from 'react-icons/md';

function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex flex-col  gap-2 items-center justify-center bg-Primary text-white">
        <MdOutlineCatchingPokemon className="animate-spin text-4xl" />
        <p className="animate-pulse">Loading...</p>
      </div>
      ;
    </>
  );
}

export default Loading;
