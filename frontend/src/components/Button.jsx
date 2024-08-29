/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" h-[40px] w-[193px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6 ml-4"
    >
      {label}
    </button>
  );
}
