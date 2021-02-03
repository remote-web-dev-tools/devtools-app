import React from 'react';
import { ConfigureInterface } from '@interfaces/configure.interface';

const getSubjectIdFromUrl = (): string => {
  const url = new URL(window.location.href);

  return url.searchParams.get('subjectId') || '';
};

export const useConfigure = () => {
  const subjectIdFromUrlRef = React.useRef(getSubjectIdFromUrl());

  const [configure, setConfigure] = React.useState<ConfigureInterface>({
    transferServerUrl: '',
    subjectId: subjectIdFromUrlRef.current,
  });
  const [needConfigure, setNeedConfigure] = React.useState(false);

  React.useEffect(() => {
    const transferServerUrl = localStorage.getItem('transferServerUrl') || '';
    const subjectId = subjectIdFromUrlRef.current || localStorage.getItem('subjectId') || '';

    setConfigure({
      subjectId,
      transferServerUrl,
    });

    setNeedConfigure(!transferServerUrl);
  }, []);

  const saveConfigure = React.useCallback((configure: Required<ConfigureInterface>) => {
    localStorage.setItem('transferServerUrl', configure.transferServerUrl);
    localStorage.setItem('subjectId', configure.subjectId);

    setConfigure(configure);
    setNeedConfigure(!configure.transferServerUrl);
  }, []);

  return {
    configure,
    needConfigure,
    saveConfigure,
  };
};
