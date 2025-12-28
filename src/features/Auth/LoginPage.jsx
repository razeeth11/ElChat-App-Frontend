import LOGO from "../../assets/logo.png";
import CHAT from "../../assets/chat-illustration.png";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { Check, ChevronDown, Moon, Search, Sun } from "lucide-react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { AuthContext } from "../../AuthContext/AuthContent";
import clsx from "clsx";
import { BASE_URL } from "../../App";

export function LoginPage() {
  const { theme, setTheme } = useTheme();
  const { setAuthValue } = useContext(AuthContext);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "IND",
    code: "+91",
    flag: "https://flagcdn.com/w320/in.png",
    phoneNumber: "",
    numberError: false,
  });

  const sendOtpMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${BASE_URL}/auth/login-otp`, payload);
    },

    onSuccess: (response) => {
      toast.success(response.data.message || "OTP sent successfully");
      setAuthValue("otp-verify");
    },

    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  function nextClickHandler() {
    if (
      selectedCountry.phoneNumber === "" ||
      selectedCountry.phoneNumber.length < 7
    ) {
      setSelectedCountry((prev) => ({ ...prev, numberError: true }));
      toast.error("Please enter a valid phone number");
      return;
    }

    setAuthValue("verify-otp");

    sendOtpMutation.mutate({
      phoneNumber: `${selectedCountry.code}${selectedCountry.phoneNumber}`,
    });
  }

  return (
    <div className="h-screen w-full px-5 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-2.5">
          <img
            src={LOGO}
            alt="ElChat Logo"
            loading="lazy"
            className="w-8 h-8"
          />
          <h2 className="font-medium">ElChat App</h2>
        </div>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>
      <div className="flex flex-col gap-5 m-auto max-w-200 h-150 mt-30">
        <div className="flex items-center justify-between gap-2.5 p-5 rounded-2xl border-2 bg-bg-secondary">
          <div className="flex items-center gap-5">
            <img
              src={CHAT}
              alt="ElChat Logo"
              loading="lazy"
              className="hidden md:block md:w-20 md:h-15 rounded-2xl"
            />
            <div>
              <h3 className="font-medium">Use ChatApp on Desktop</h3>
              <p className="text-sm">
                Faster typing, bigger screen, zero distractions.
              </p>
            </div>
          </div>
          <Button className="rounded-full py-4 px-6 md:py-6 md:px-8 bg-foreground">
            Learn More
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center gap-12 text-center p-7 rounded-2xl border-2 bg-bg-secondary">
          <div>
            <h1 className="text-2xl md:text-4xl">Enter phone number</h1>
            <p className="text-sm md:text-xl mt-2.5">
              Select a country and enter your phone number
            </p>
          </div>
          <div>
            <SelectCountry
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>
          <Button
            className="p-5 w-30 rounded-full cursor-pointer"
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SelectCountry({ selectedCountry, setSelectedCountry }) {
  const [search, setSearch] = useState("");
  const [openCountries, setOpenCountries] = useState(false);

  function selectCountryHandler(item) {
    setSelectedCountry({
      name: item.cca3,
      code: `${item.idd.root}${
        item.idd.suffixes?.length === 1 && item.idd.suffixes[0]?.length < 3
          ? item.idd.suffixes[0]
          : ""
      }`,
      flag: item.flags.png,
    });
  }

  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca3,flags,idd"
      );
      return res.data;
    },
  });

  const fiteredCountries = useMemo(() => {
    return query.data?.filter((item) =>
      item.cca3.toLowerCase().includes(search)
    );
  }, [search, query.data]);

  return (
    <div className="flex flex-col gap-4">
      <Popover className="border w-90" open={openCountries}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="w-80 px-5 py-6 rounded-full cursor-pointer"
            onClick={() => setOpenCountries((prev) => !prev)}
          >
            {selectedCountry.flag && (
              <img
                src={selectedCountry.flag}
                alt="selected-country-image.png"
                loading="lazy"
                className="w-6 h-4 mr-2.5"
              />
            )}
            Select Country
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-bg-secondary">
          <div className="relative">
            <Input
              className="focus-visible:ring-1 border-none rounded-full pl-11 pr-7 h-10"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute top-2.5 left-4" size={20} />
          </div>
          <ScrollArea className="h-50 rounded-md border p-2.5 mt-2.5">
            {query.isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonDemo key={index} />
              ))}
            {fiteredCountries?.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex justify-between gap-2.5 p-6 w-full [&:hover]:bg-bg-tertiary cursor-pointer"
                onClick={() => {
                  selectCountryHandler(item);
                  setOpenCountries(false);
                }}
              >
                <div>
                  <img
                    src={item.flags.png}
                    loading="lazy"
                    className="w-10 h-4"
                  />
                </div>
                <h1 className="text-center text-xs w-full">{item.cca3}</h1>
                <p className="w-10">
                  {item.idd.root}
                  {item.idd.suffixes?.length === 1 &&
                  item.idd.suffixes[0]?.length < 3
                    ? item.idd.suffixes[0]
                    : null}
                </p>
                {/* <Check /> */}
              </Button>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <div className="relative">
        <Input
          className={clsx(
            "focus-visible:ring-1 rounded-full pl-15 pr-7 h-12.5 text-[16px]! m-auto border-2",
            selectedCountry.numberError && "border-red-500"
          )}
          type="number"
          onChange={(e) =>
            setSelectedCountry((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
              numberError: false,
            }))
          }
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "E") {
              e.preventDefault();
            }
          }}
        />
        <p className="absolute top-3.5 left-4">{selectedCountry.code}</p>
      </div>
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <Skeleton className="h-6 w-8 rounded-none" />
      <Skeleton className="h-4 w-15" />
      <Skeleton className="h-4 w-15" />
    </div>
  );
}
