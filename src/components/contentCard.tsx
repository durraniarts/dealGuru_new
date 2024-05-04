import Image from "next/image";
import Link from "next/link";

const ContentCard = ({ deal }: any) => {
  console.log(deal);
  return (
    <div className="  w-full h-[250px] bg-white rounded-xl shadow-lg shadow-gray-200 p-6 flex gap-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center ">
        <Image
          src={deal?.image}
          width={30}
          height={30}
          alt="placeholder"
          className=" w-auto h-full object-scale-down  "
        />
      </div>
      <div className="flex gap-4 w-[65%] flex-col justify-between">
        <div className="flex gap-4">
          <div className="flex-2 flex-col flex gap-4 h-fit">
            <h1 className="text-black text-xl font-semibold capitalize">
              {deal.title}
            </h1>
            <h2 className="font-medium text-lg ">$ {deal?.price}</h2>
          </div>
          <div className="flex flex-1 items-end h-fit min-w-fit flex-col gap-4">
            <p className="font-normal text-sm ">
              Good deal? <span className="font-medium ">Vote here:</span>{" "}
            </p>
            <div className="flex gap-2">
              <div className="border border-red-400  w-[35px] h-[35px] flex p-2 items-center justify-center rounded-md  ">
                <span>22</span>
              </div>
              <div className="border border-blue-950 w-[35px] h-[35px] flex p-2 items-center justify-center rounded-md cursor-pointer">
                <Image alt="heart" width={30} height={30} src={"/heart.svg"} />
              </div>
              <div className="border border-blue-950 w-[35px] h-[35px] flex p-2 items-center justify-center rounded-md cursor-pointer">
                <Image alt="heart" width={30} height={30} src={"/like.svg"} />
              </div>
              <div className="border border-blue-950 w-[35px] h-[35px] flex p-2 items-center justify-center rounded-md cursor-pointer">
                <Image
                  alt="heart"
                  width={30}
                  height={30}
                  src={"/dislike.svg"}
                />
              </div>
            </div>
          </div>
        </div>
        <Link
          className=" bg-bg_color text-white text-base text-center p-2 rounded-md font-medium "
          href={`/deal/${deal._id}`}
        >
          {" "}
          Go to deal
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
