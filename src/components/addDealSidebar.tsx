import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dealValidation } from "@/validation/validation";

import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { UploadImage } from "./upload_image";

export function AddDeal() {
  const [imageData, setImageData] = useState<any | undefined>();
  const [storedValues, setValues] = useState({
    title: "",
    price: "",
  });

  const { toast } = useToast();

  const onSubmit = async () => {
    // console.log(storedValues);

    axios
      .post("/api/adddeal", { storedValues, img: imageData && imageData[0] })
      .then(function (response) {
        console.log(response);
        if (response) {
          toast({ title: "Successfully uploaded" });
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Try again with complete information",
          });
        }
      });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="font-semibold bg-bg_color text-white ">
          Add Deal +
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Make Your Own Deal</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 mt-10">
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              placeholder="Asus ZenBook"
              id="title"
              className="col-span-3"
              onChange={(e) =>
                setValues({ ...storedValues, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="username" className="text-left">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="350$"
              className="col-span-3"
              onChange={(e) =>
                setValues({ ...storedValues, price: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4 mt-4 ">
            <UploadImage setImageData={setImageData} imageDate={imageData} />
          </div>
        </div>
        <SheetFooter>
          {/* <SheetClose asChild> */}
          <Button type="submit" onClick={onSubmit} className="mt-6">
            Add Deal
          </Button>
          {/* </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
