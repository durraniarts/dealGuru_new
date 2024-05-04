import connect from "@/db/dbConfig";
import Deal from "@/db/model/dealModel";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/config/config";

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    var dealCreated: any;
    let dbResponse = await connect();
    cloudinary.cloudinary.uploader
      .upload(req.img.data_url)
      .then(async (d) => {
        const newDeal = new Deal({
          title: req.storedValues.title,
          image: d.secure_url,
          price: req.storedValues.price,
        });
        dealCreated = await newDeal.save();
      })
      .catch((err) => console.log(err));

    return NextResponse.json({ message: "done" });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
