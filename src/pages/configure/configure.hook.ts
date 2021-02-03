import { useCallback, useEffect, useState } from 'react';
import { ConfigureInterface } from '@interfaces/configure.interface';

export const useConfigure = () => {
  const [configure, setConfigure] = useState<ConfigureInterface>({ transferServerUrl: '' });
  const [needConfigure, setNeedConfigure] = useState(false);

  useEffect(() => {
    const host = localStorage.getItem('host') || '';
    const port = localStorage.getItem('port') || '';

    // setConfigure({});
    setNeedConfigure(!host);
  }, []);

  const saveConfigure = useCallback((configure: ConfigureInterface) => {
    // localStorage.setItem('host', configure.host);
    // localStorage.setItem('port', configure.port || '');

    setConfigure(configure);
    // setNeedConfigure(!configure.host);
  }, []);

  return {
    configure,
    needConfigure,
    saveConfigure,
  };
};
