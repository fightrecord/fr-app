import React, { useState } from 'react';
import firebase from 'firebase/app';
import cx from 'classnames';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';

import DisplayName from './DisplayName';
import Logo from './Logo';
import PickRoles from './PickRoles';
import Reset from './Reset';
import Register from './Register';
import SelectIdp from './SelectIdp';
import SignIn from './SignIn';

import Coach from './coach';
import Fighter from './fighter';
import Promoter from './promoter';

import './Onboard.css';

const Pages = {
  Logo: 0,
  SelectIdp: 1,
  SignIn: 2,
  Reset: 3,
  Register: 4,
  PickRoles: 5,
  Fighter: 6,
  Coach: 7,
  Promoter: 8,
  DisplayName: 9,
  Confirm: 10
};

const AllRoles = [
  { key: 'fighter', label: `I'm a Fighter` },
  { key: 'coach', label: `I'm a Coach` },
  { key: 'promoter', label: `I'm a Promoter` }
];

export default () => {
  const { state } = useGlobalState();
  const [pageIndex, setPageIndex] = useState(Pages.Logo);
  const [roles, setRoles] = useState();

  const { profile, token } = state;
  const { fighterProfile, coachProfile, promoterProfile } = profile || {};

  const getClassNames = index => cx('onboard-page', {
    selected: pageIndex === index
  });

  const cancelRoles = () => {
    setRoles();
    setPageIndex(Pages.PickRoles);
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  if (token) {
    if (profile && !profile.name) {
      setPageIndex(Pages.DisplayName);
    } else if (pageIndex === Pages.SelectIdp || pageIndex === Pages.SignIn) {
      setPageIndex(Pages.PickRoles);
    } else if (pageIndex === Pages.PickRoles && roles) {
      setPageIndex(Pages.Fighter);
    } else if (pageIndex === Pages.Fighter && roles && (!roles.fighter || fighterProfile)) {
      setPageIndex(Pages.Coach);
    } else if (pageIndex === Pages.Coach && roles && (!roles.coach || coachProfile)) {
      setPageIndex(Pages.Promoter);
    } else if (pageIndex === Pages.Promoter && roles && (!roles.promoter || promoterProfile)) {
      setPageIndex(Pages.DisplayName);
    }
  } else if (!token && pageIndex === Pages.PickRoles) {
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
            allRoles={AllRoles}
            onComplete={setRoles}
            onSkip={() => setPageIndex(Pages.DisplayName)}
            onCancel={() => signOut()}
          />
        </div>
        <div className={getClassNames(Pages.Fighter)}>
          <Fighter
            onComplete={() => setPageIndex(Pages.Coach)}
            onSkip={() => setPageIndex(Pages.DisplayName)}
            onCancel={() => cancelRoles()}
          />
        </div>
        <div className={getClassNames(Pages.Coach)}>
          <Coach
            onComplete={() => setPageIndex(Pages.Promoter)}
            onSkip={() => setPageIndex(Pages.DisplayName)}
            onCancel={() => cancelRoles()}
          />
        </div>
        <div className={getClassNames(Pages.Promoter)}>
          <Promoter
            onComplete={() => setPageIndex(Pages.DisplayName)}
            onSkip={() => setPageIndex(Pages.DisplayName)}
            onCancel={() => cancelRoles()}
          />
        </div>
        <div className={getClassNames(Pages.DisplayName)}>
          <DisplayName
            onComplete={() => setPageIndex(Pages.Confirm)}
            onCancel={() => cancelRoles()}
          />
        </div>
      </div>
    </div>
  );
};

