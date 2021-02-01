import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { configureContext } from '../../App';
import styles from './configure.module.scss';

const Configure = () => {
  const history = useHistory();
  const { saveConfigure } = useContext(configureContext);
  const { control, handleSubmit, errors: fieldsErrors } = useForm();

  const onSubmit = (data: any) => {
    saveConfigure({
      host: data.host,
      port: data.port || '',
    });

    history.push('/');
  };

  return (
    <Container>
      <div className={styles.content}>
        <header className={styles.header}>
          <img src={process.env.PUBLIC_URL + '/logo80.png'} alt="" />
          <h1>Remote web dev tools</h1>
        </header>

        <form autoComplete="off" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={'host'}
            defaultValue={''}
            as={
              <TextField
                fullWidth
                label="Host"
                error={fieldsErrors.host}
                helperText={fieldsErrors.host ? 'Host is required' : null}
                placeholder={'Input transfer server host'}
                style={{ marginBottom: 16 }}
              />
            }
            rules={{
              required: true,
            }}
          />

          <Controller
            name={'port'}
            control={control}
            defaultValue={''}
            as={
              <TextField
                fullWidth
                label="Port"
                placeholder={'Input transfer server port'}
                style={{ marginBottom: 16 }}
              />
            }
          />

          <div className={styles.buttonItem}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Configure;
