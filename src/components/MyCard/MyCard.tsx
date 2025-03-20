import * as React from "react";
import {
  makeStyles,
  Button,
  Caption1,
  Text,
  tokens,
  Subtitle1,
} from "@fluentui/react-components";
import { Edit16Regular,  } from "@fluentui/react-icons";
import { Card, CardHeader } from "@fluentui/react-components";


const useStyles = makeStyles({
  main: {
    gap: "36px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },

  card: {
    width: "360px",
    maxWidth: "100%",
    height: "fit-content",
  },

  section: {
    width: "fit-content",
  },

  title: { margin: "0 0 12px" },

  horizontalCardImage: {
    width: "64px",
    height: "64px",
  },

  headerImage: {
    borderRadius: "4px",
    maxWidth: "44px",
    maxHeight: "44px",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  text: { margin: "0" },
});


export const MyCard = ({setOpen,data, units}) => {
  const styles = useStyles();

  const isMetric = units === 'metric';
  
  if(data?.current) 
  return (
    <div className={styles.main}>
      <section className={styles.section}>
       {/* <div style={{width: '300px'}}>{JSON.stringify(data)}</div>  */}
        

        <Card className={styles.card}>
          <CardHeader
            image={
              <img
                className={styles.headerImage}
                // src={resolveAsset("app_logo.svg")}
                src={`https://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon || ''}@2x.png`}
                alt="Weather icon"
                title="Weather icon"
              />
            }
            header={<Text weight="semibold">{data.current.temp}&deg; {isMetric ? 'C': 'F'}</Text>}
            description={
              <Caption1 className={styles.caption}>{data.locationData.name}, {data.locationData.country}</Caption1>
            }
            action={
              <Button
                appearance="transparent"
                icon={<Edit16Regular />}
                title="Edit City"
                aria-label="More options"
                onClick={() => setOpen(true)}
              />
            }
          />



         { data ? <> <p className={styles.text}>
            Location: {data.locationData.name}, {data.locationData.country}
          </p>
          <p className={styles.text}>
            Temperature: {data.current.temp}&deg; {isMetric ? 'C': 'F'}
          </p>
          <p className={styles.text}>
            Description: {data.current.weather[0].description}
          </p>
          <p className={styles.text}>
            Humidity: {data.current.humidity} %
          </p>
          <p className={styles.text}>
            Wind Speed: {data.current.wind_speed} {isMetric ? 'metre/sec': 'miles/hour'}
          </p> </> : null}
        </Card>
      </section>

    
    </div>
  );
};