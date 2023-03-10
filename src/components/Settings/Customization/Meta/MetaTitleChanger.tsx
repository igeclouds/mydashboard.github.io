import { TextInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ChangeEventHandler, useState } from 'react';
import { useConfigContext } from '../../../../config/provider';
import { useConfigStore } from '../../../../config/store';

interface MetaTitleChangerProps {
  defaultValue: string | undefined;
}

// TODO: change to pageTitle
export const MetaTitleChanger = ({ defaultValue }: MetaTitleChangerProps) => {
  const { t } = useTranslation('settings/customization/page-appearance');
  const updateConfig = useConfigStore((x) => x.updateConfig);
  const { name: configName } = useConfigContext();
  const [metaTitle, setMetaTitle] = useState(defaultValue);

  if (!configName) return null;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const { value } = ev.currentTarget;
    const metaTitle = value.trim().length === 0 ? undefined : value;
    setMetaTitle(metaTitle);
    updateConfig(configName, (prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        customization: {
          ...prev.settings.customization,
          metaTitle,
        },
      },
    }));
  };

  return (
    <TextInput
      label={t('metaTitle.label')}
      placeholder="homarr - the best dashboard"
      value={metaTitle}
      onChange={handleChange}
    />
  );
};
