import { useNavigate } from "react-router-dom";

function Card({ buttonProps }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to builder page with button ID
    navigate(`/builder?id=${buttonProps._id}`);
  };
  const timeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) {
      return "Just Now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  // Check if the button was created recently

  return (
    <div className="bg-white w-[240px] h-[345px] shadow-sm rounded-lg p-6 border-2 ml-3 mt-2">
      <div className="bg-pinky w-[208px] h-[247px] ml-[-0.5rem] p-2 items-center">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <button
              className="px-3 py-1 text-white text-xs font-semibold mt-14 ml-4"
              style={{
                width: `${buttonProps.width || 100}px`,
                height: `${buttonProps.height || 50}px`,
                borderRadius: `${buttonProps.roundedness || 1}px`,
                backgroundColor: buttonProps.color || "#b42d2d",
                opacity: buttonProps.opacity || 1,
                border: `${buttonProps.strokeWidth || 0}px solid ${
                  buttonProps.strokeColor || "#000000"
                }`,
              }}
              onClick={handleClick} // Navigate to builder with ID
            >
              {buttonProps.text || "Button"}
            </button>
          </div>
        </div>
      </div>
      <div className="text-sm ml-[-0.5rem] mt-0.5">
        {buttonProps.name || "Button"}
      </div>
      <div className="text-gray-500 text-xs ml-[-0.5rem] mt-[0.5rem]">
        {buttonProps.lastUpdated && (
          <div className="flex mt-2">
            <div className="text-xs font-medium ">Last Updated: </div>
            <div className="text-xs">{timeAgo(buttonProps.lastUpdated)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
