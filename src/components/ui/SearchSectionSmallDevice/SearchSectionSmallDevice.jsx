import CommonButton from "@/components/shared/CommonButton";
import {
  Card,
  CardBody,
  Checkbox,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { IoSearchSharp } from "react-icons/io5";
import Drawer from "react-modern-drawer";
import { AiOutlineClose } from "react-icons/ai";

const SearchSectionSmallDevice = ({ isOpen, toggleDrawer, state }) => {
  const {
    setCategory,
    setType,
    setLocation,
    setMinSalary,
    setMaxSalary,
    type,
    preference,
    setPreference,
    submit,
    setSubmit,
    setPostedDate,
    postedDate,
    setPage,
  } = state;
  const category = [
    "all",
    "Web Developer",
    "Accounting",
    "Administrative",
    "Data Analyst",
    "Manager",
    "Marketing Specialist",
    "Customer Service",
    "Education",
    "Engineering",
    "Finance",
    "IT",
  ];

  const dateLimit = [
    {
      value: 7,
      text: "PAST WEEK",
    },
    {
      value: 15,
      text: "PAST 2 WEEK",
    },
    {
      value: 30,
      text: "PAST MONTH",
    },
    {
      value: "",
      text: "ALL",
    },
  ];

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value == "all" ? "" : value);
    console.log(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleType = (value) => {
    const index = type.indexOf(value);
    if (index === -1) {
      setType((prevType) => [...prevType, value]);
    } else {
      setType((prevType) => prevType.filter((item) => item !== value));
    }
  };

  const handleSalary = (value) => {
    setMinSalary(value[0]);
    setMaxSalary([value[1]]);
  };

  const handlePostedDate = (event) => {
    setPostedDate(event.target.value);
  };
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      style={{ width: "300px" }}
      className="lg:hidden "
    >
      <div>
       
        <Card className="sectionSearchSection rounded-none h-lvh overflow-y-hidden sticky top-0  ">
       <div className="flex justify-end">
       <button className="mb-2 mt-2 mr-5" style={{fontSize: "22px"}} onClick={toggleDrawer}><AiOutlineClose /></button>
       </div>
          <CardBody className="p-5">
            <ScrollShadow hideScrollBar offset={60} size={200}>
              <div className="">
                <div className="">
                  <div className="">
                    <Select
                      label="Select Category"
                      className="border border-primaryColor rounded-xl"
                      onChange={handleCategory}
                    >
                      {category.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item.toUpperCase()}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className=" mt-5  lg:mt-5 relative md:flex-1  ">
                    <Input
                      type="text"
                      label="Location"
                      placeholder="Search"
                      onChange={handleLocation}
                      className="border md:w-full border-primaryColor rounded-xl md:flex-1"
                    />
                    <div className="absolute top-5 right-3">
                      <IoSearchSharp />
                    </div>
                  </div>
                </div>

                <div className="mt-5 ml-1  md:gap-14 lg:gap-0">
                  <div>
                    <p className="mb-2 text-secondaryColor font-semibold">
                      Type
                    </p>
                    <div className="flex flex-col">
                      <Checkbox
                        checked={true}
                        onChange={() => handleType("on-site")}
                        color="success"
                      >
                        On-Sight
                      </Checkbox>
                      <Checkbox
                        checked
                        onChange={() => handleType("remote")}
                        color="success"
                      >
                        Remote
                      </Checkbox>
                      <Checkbox
                        checked
                        onChange={() => handleType("hybrid")}
                        color="success"
                      >
                        Hybrid
                      </Checkbox>
                    </div>
                  </div>

                  <div className="mt-5 ">
                    <p className="mb-2 text-secondaryColor font-semibold">
                      Preferences
                    </p>
                    <div className="flex flex-col">
                      <Checkbox
                        checked={true}
                        onChange={() => setPreference(!preference)}
                        color="success"
                      >
                        Most Applied
                      </Checkbox>
                    </div>
                  </div>
                </div>

                <div className="mt-5 mb-3">
                  <p className="mb-2 text-secondaryColor font-semibold">
                    Salary Expectation
                  </p>

                  <Slider
                    label="Range"
                    step={10000}
                    maxValue={100000}
                    minValue={0}
                    defaultValue={[0, 100000]}
                    showSteps={true}
                    showTooltip={true}
                    showOutline={true}
                    disableThumbScale={true}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    tooltipValueFormatOptions={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    onChange={handleSalary}
                    classNames={{
                      base: "",
                      filler:
                        "bg-gradient-to-r from-primaryColor to-primaryColor",
                      labelWrapper: "mb-2",
                      label: "font-medium text-default-700 text-medium",
                      value: "font-medium text-default-500 text-small",
                      thumb: [
                        "transition-size",
                        "bg-gradient-to-r from-primaryColor to-primaryColor",
                        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                      ],
                      step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                    }}
                    tooltipProps={{
                      offset: 10,
                      placement: "bottom",
                      classNames: {
                        base: [
                          // arrow color
                          "before:bg-gradient-to-r before:from-primaryColor before:to-primaryColor",
                        ],
                        content: [
                          "py-2 shadow-xl",
                          "text-white bg-gradient-to-r from-primaryColor to-primaryColor",
                        ],
                      },
                    }}
                  />
                </div>

                <div className="mt-5">
                  <Select
                    label="Posted Date"
                    className="md:w-full border border-primaryColor rounded-xl"
                    onChange={handlePostedDate}
                  >
                    {dateLimit.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.text.toUpperCase()}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div
                  onClick={() => {
                    setSubmit(!submit);
                    setPage(1);
                    toggleDrawer()
                  }}
                  className="mt-10 "
                >
                  <CommonButton buttonName={"Search"} />
                </div>
              </div>
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
    </Drawer>
  );
};

export default SearchSectionSmallDevice;
