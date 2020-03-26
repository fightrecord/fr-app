import React, { useState } from 'react';
import cx from 'classnames';
import { useFrameworkState } from '../../_framework';
import Logo from './Logo';
import SelectIdp from './SelectIdp';
import SignIn from './SignIn';
import Reset from './Reset';
import Register from './Register';
import PickRoles from './PickRoles';

const Pages = {
  Logo: 0,
  SelectIdp: 1,
  SignIn: 2,
  Reset: 3,
  Register: 4,
  PickRoles: 5
};

export default () => {
  const [{ user }] = useFrameworkState();
  const [pageIndex, setPageIndex] = useState(Pages.SelectIdp);

  const getClassNames = index => cx('onboard-page', {
    selected: pageIndex === index
  });

  if (user && (pageIndex === Pages.SelectIdp || pageIndex === Pages.SignIn)) {
    setPageIndex(Pages.PickRoles);
  } else if (!user && pageIndex === Pages.PickRoles) {
    setPageIndex(Pages.SelectIdp);
  }

  return (
    <div className="onboard">
      <div className="onboard-inner" style={{ marginLeft: `-${(pageIndex * 100)}%` }}>
        <div className={getClassNames(Pages.Logo)}>
          <Logo
            selected={pageIndex === Pages.Logo}
            onComplete={() => setPageIndex(Pages.SelectIdp)}
            onTimeout={() => setPageIndex(Pages.SelectIdp)}
          />
        </div>
        <div className={getClassNames(Pages.SelectIdp)}>
          <SelectIdp
            onSignIn={() => setPageIndex(Pages.SignIn)}
            onComplete={() => setPageIndex(Pages.PickRoles)}
          />
        </div>
        <div className={getClassNames(Pages.SignIn)}>
          <SignIn
            onRegister={() => setPageIndex(Pages.Register)}
            onReset={() => setPageIndex(Pages.Reset)}
            onComplete={() => setPageIndex(Pages.PickRoles)}
            onCancel={() => setPageIndex(Pages.SelectIdp)}
          />
        </div>
        <div className={getClassNames(Pages.Reset)}>
          <Reset
            onComplete={() => setPageIndex(Pages.SignIn)}
            onCancel={() => setPageIndex(Pages.SignIn)}
          />
        </div>
        <div className={getClassNames(Pages.Register)}>
          <Register
            onComplete={() => setPageIndex(Pages.PickRoles)}
            onCancel={() => setPageIndex(Pages.SignIn)}
          />
        </div>
        <div className={getClassNames(Pages.PickRoles)}>
          <PickRoles
            onComplete={() => setPageIndex()}
            onCancel={() => setPageIndex(Pages.Logo)}
          />
        </div>
      </div>
    </div>
  );
};

