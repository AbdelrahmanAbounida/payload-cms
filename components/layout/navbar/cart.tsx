import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const items = [
    // TODO:: Load from context zustand
    {
      image: "/assets/images/products/product1.jpg",
      title: "GUYER CHAIR",
      price: 45,
    },
    {
      image: "/assets/images/products/product2.jpg",
      title: "BED KING SIZE",
      price: 45,
    },
    {
      image: "/assets/images/products/product3.jpg",
      title: "COUPLE SOFA",
      price: 55,
    },
  ];
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="h-9 w-9 relative hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <ShoppingCart size={19} />
            <div className="w-5 h-5 text-center flex text-[11px] items-center justify-center text-xs rounded-full absolute -top-2 -right-2 text-white bg-green-600">
              1
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart (0)</SheetTitle>
            <SheetDescription>
              <Separator />
              {false && (
                <div className="gap-5 mt-5 flex flex-col">
                  {items.map((item, index) => (
                    <div className="flex items-center gap-3 w-full" key={index}>
                      <img
                        className="rounded-md"
                        width={50}
                        height={90}
                        src={item.image}
                      />

                      <div className="flex flex-col  w-full">
                        <p className="text-sm text-black/90 truncate max-w-[110px] ">
                          {item.title}
                        </p>
                        <p className="text-gray-600">
                          $ {item.price} x 1 = $ {1 * item.price}
                        </p>
                      </div>

                      <div className="items-center gap-1 flex">
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="p-2 w-8 h-8"
                        >
                          <Minus size={11} />
                        </Button>
                        <Input
                          // type="number"
                          defaultValue={1}
                          // value={1}
                          disabled
                          className=" w-10 h-8"
                        />
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="p-2 w-8 h-8"
                        >
                          <Plus size={11} />
                        </Button>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="p-2 w-8 h-8"
                        >
                          <Trash className="text-red-600" size={15} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {true && (
                <div className="flex flex-col items-center justify-center h-screen w-full ">
                  <img src="/empty-cart-svgrepo-com.svg" />
                  <p className="text-lg">Your Cart is Empty!!</p>
                </div>
              )}
              {/**items.length == 0 */}
              {/** Empty State */}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
