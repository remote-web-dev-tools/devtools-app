import React from 'react';
import { ConfigureInterface } from '@interfaces/configure.interface';

const getSubjectIdFromUrl = (): string => {
  const url = new URL(window.location.href);

  return url.searchParams.get('clientId') || '';
};

export const useConfigure = () => {
  const clientFromUrlRef = React.useRef(getSubjectIdFromUrl());

  const [configure, setConfigure] = React.useState<ConfigureInterface>({
    transferServerUrl: '',
    clientId: '',
  });
  const [needConfigure, setNeedConfigure] = React.useState(false);

  React.useEffect(() => {
    const transferServerUrl = localStorage.getItem('transferServerUrl') || '';
    const clientId = clientFromUrlRef.current;

    setConfigure({
      clientId,
      transferServerUrl,
    });

    setNeedConfigure(!transferServerUrl);
  }, []);

  const saveConfigure = React.useCallback((configure: Required<ConfigureInterface>) => {
    localStorage.setItem('transferServerUrl', configure.transferServerUrl);

    setConfigure(configure);
    setNeedConfigure(!configure.transferServerUrl);
  }, []);

  return {
    configure,
    needConfigure,
    saveConfigure,
  };
};
