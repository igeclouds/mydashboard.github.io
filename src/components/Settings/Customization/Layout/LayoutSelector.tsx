import {
  ActionIcon,
  Checkbox,
  createStyles,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useConfigContext } from '../../../../config/provider';
import { useConfigStore } from '../../../../config/store';
import { CustomizationSettingsType } from '../../../../types/settings';
import { Logo } from '../../../layout/Logo';

interface LayoutSelectorProps {
  defaultLayout: CustomizationSettingsType['layout'] | undefined;
}

// TODO: add translations
export const LayoutSelector = ({ defaultLayout }: LayoutSelectorProps) => {
  const { classes } = useStyles();

  const { name: configName } = useConfigContext();
  const updateConfig = useConfigStore((x) => x.updateConfig);

  const [leftSidebar, setLeftSidebar] = useState(defaultLayout?.enabledLeftSidebar ?? true);
  const [rightSidebar, setRightSidebar] = useState(defaultLayout?.enabledRightSidebar ?? true);
  const [docker, setDocker] = useState(defaultLayout?.enabledDocker ?? false);
  const [ping, setPing] = useState(defaultLayout?.enabledPing ?? false);
  const [searchBar, setSearchBar] = useState(defaultLayout?.enabledSearchbar ?? false);

  const { colors, colorScheme } = useMantineTheme();
  const { t } = useTranslation('settings/common');

  if (!configName) return null;

  const handleChange = (
    key: keyof CustomizationSettingsType['layout'],
    event: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    const value = event.target.checked;
    setState(value);
    updateConfig(
      configName,
      (prev) => {
        const { layout } = prev.settings.customization;

        layout[key] = value;

        return {
          ...prev,
          settings: {
            ...prev.settings,
            customization: {
              ...prev.settings.customization,
              layout,
            },
          },
        };
      },
      true
    );
  };

  return (
    <Stack spacing="xs">
      <Title order={6}>{t('layout.title')}</Title>

      <Paper px="xs" py={4} withBorder>
        <Group position="apart">
          <Logo size="xs" />
          <Group spacing={5}>
            {searchBar ? (
              <Paper
                style={{
                  height: 10,
                  backgroundColor: colorScheme === 'dark' ? colors.gray[8] : colors.gray[1],
                }}
                p={2}
                w={60}
              />
            ) : null}
            {docker ? <ActionIcon size={10} disabled /> : null}
          </Group>
        </Group>
      </Paper>

      <Group align="stretch">
        {leftSidebar && (
          <Paper className={classes.secondaryWrapper} p="xs" withBorder>
            <Flex align="center" justify="center" direction="column">
              <Text align="center">{t('layout.sidebar')}</Text>
              <Text color="dimmed" size="xs" align="center">
                Only for
                <br />
                apps &<br />
                integrations
              </Text>
            </Flex>
          </Paper>
        )}

        <Paper className={classes.primaryWrapper} p="xs" withBorder>
          <Text align="center">{t('layout.main')}</Text>
          <Text color="dimmed" size="xs" align="center">
            {t('layout.cannotturnoff')}
          </Text>
        </Paper>

        {rightSidebar && (
          <Paper className={classes.secondaryWrapper} p="xs" withBorder>
            <Flex align="center" justify="center" direction="column">
              <Text align="center">{t('layout.sidebar')}</Text>
              <Text color="dimmed" size="xs" align="center">
                Only for
                <br />
                apps &<br />
                integrations
              </Text>
            </Flex>
          </Paper>
        )}
      </Group>

      <Stack spacing="xs">
        <Checkbox
          label={t('layout.enablelsidebar')}
          description={t('layout.enablelsidebardesc')}
          checked={leftSidebar}
          onChange={(ev) => handleChange('enabledLeftSidebar', ev, setLeftSidebar)}
        />
        <Checkbox
          label={t('layout.enablersidebar')}
          description={t('layout.enablersidebardesc')}
          checked={rightSidebar}
          onChange={(ev) => handleChange('enabledRightSidebar', ev, setRightSidebar)}
        />
        <Checkbox
          label={t('layout.enablesearchbar')}
          checked={searchBar}
          onChange={(ev) => handleChange('enabledSearchbar', ev, setSearchBar)}
        />
        <Checkbox
          label={t('layout.enabledocker')}
          checked={docker}
          onChange={(ev) => handleChange('enabledDocker', ev, setDocker)}
        />
        <Checkbox
          label={t('layout.enableping')}
          checked={ping}
          onChange={(ev) => handleChange('enabledPing', ev, setPing)}
        />
      </Stack>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  primaryWrapper: {
    flexGrow: 2,
  },
  secondaryWrapper: {
    flexGrow: 1,
    maxWidth: 100,
  },
}));
