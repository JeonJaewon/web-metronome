import * as styles from "@/components/FeatureTabs/FeatureTabs.css";
import { useFeatureContext } from "@/contexts/featureContext";
import { Tabs } from "@mantine/core";

export const FeatureTabs = () => {
  const { setFocusedFeature } = useFeatureContext();
  return (
    <Tabs
      inverted
      className={styles.featureTabs}
      defaultValue="metronome"
      onChange={(value) =>
        setFocusedFeature(value as "metronome" | "guitarScales")
      }
    >
      <Tabs.List>
        <Tabs.Tab className={styles.featureTab} value="metronome">
          Metronome
        </Tabs.Tab>
        <Tabs.Tab className={styles.featureTab} value="guitarScales">
          Guitar Scales
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
