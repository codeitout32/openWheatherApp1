import React, { useEffect } from "react";
import { fetchDataWithParams } from "./MyCard/service";
import { myApiKey } from "../constants";
import { MyCard } from "./MyCard/MyCard";
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  Option,
  Input,
  Label,
  OverlayDrawer,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  DrawerFooter,
  useId,
  useToastController,
  Toast,
  ToastTitle,
  Toaster,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import useStyles from "./makeStyles";
const MainApp = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [params, setParams] = React.useState({
    zip: "10001",
    country: "us",
    appid: myApiKey,
    units: "imperial",
  });

  const handleSubmit = () => {
    const apiKey = (document.getElementById("apikey") as HTMLInputElement)
      .value;
    const zip = (document.getElementById("city") as HTMLInputElement).value;
    const country = (document.getElementById("country") as HTMLInputElement)
      .value;

    setParams((params) => ({
      ...params,
      appid: apiKey,
      zip: zip,
      country: country,
    }));

    setIsOpen(false);
  };

  const [result, setResult] = React.useState<any>(null);
  useEffect(() => {
    fetchDataWithParams(params)
      .then((data) => {
        console.log(data);
        setResult(data);
      })
      .catch((error) => {
        console.log("error found", error);
        dispatchToast(
          <Toast>
            <ToastTitle>Api Error: {error.response.data.message}</ToastTitle>
          </Toast>,
          { intent: "error" }
        );
      });
  }, [params]);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  const styles = useStyles();

  // Error Handling
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  return (
    <div>
      <MyCard data={result} setOpen={setIsOpen} units={params.units}></MyCard>
      <OverlayDrawer
        as="div"
        {...restoreFocusSourceAttributes}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Edit Settings
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Set Location</p>

          <div className={styles.myField}>
            <Label htmlFor={"apikey"}>Api Key</Label>
            <Input id={"apikey"} defaultValue={params.appid} />
          </div>
          <div className={styles.myField}>
            <Label htmlFor={"city"}>Zipcode (City)</Label>
            <Input id={"city"} defaultValue={params.zip} />
          </div>
          <div className={styles.myField}>
            <Label htmlFor={"country"}>Country (Code)</Label>
            <Input id={"country"} defaultValue={params.country} />
            <small>
              Please use ISO 3166 country codes. i.e CA, US, IN etc.
            </small>
          </div>
          <div className={styles.myField}>
            <Label htmlFor={"unit"}>Unit</Label>
            <Dropdown
              id={"unit"}
              placeholder="Select Unit"
              onOptionSelect={(e, data) => {
                setParams((params) => ({
                  ...params,
                  units: String(data.optionValue),
                }));
              }}
              defaultSelectedOptions={[params.units]}
              defaultValue={
                params.units == "imperial" ? "Farenhiet" : "Celcius"
              }
            >
              <Option key="1" text="Farenhiet" value="imperial">
                "Farenhiet"
              </Option>

              <Option key="2" text={"Celcius"} value="metric">
                "Celcius"
              </Option>
            </Dropdown>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
          {/* <Button>Secondary</Button> */}
        </DrawerFooter>
      </OverlayDrawer>
      <Toaster toasterId={toasterId} />
    </div>
  );
};

export default MainApp;
