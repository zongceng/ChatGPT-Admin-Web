'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/components/button';
import { List, ListItem } from '@/components/ui-lib';
import ClearIcon from '@/icons/clear.svg';
import CloseIcon from '@/icons/close.svg';
import ResetIcon from '@/icons/reload.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { useStore } from '@/store';
import { SubmitKey, Theme } from '@/store/shared';
import styles from '@/styles/module/profile.module.scss';

function ProfileItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles['settings-title']}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles['settings-sub-title']}>{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </ListItem>
  );
}

export default function Profile() {
  const router = useRouter();

  const [config, updateConfig] = useStore((state) => [
    state.config,
    state.updateConfig,
  ]);

  return (
    <>
      <div className={styles['window-header']}>
        <div className={styles['window-header-title']}>
          <div className={styles['window-header-main-title']}>
            {Locale.Profile.Title}
          </div>
          <div className={styles['window-header-sub-title']}>
            {Locale.Profile.SubTitle}
          </div>
        </div>
        <div className={styles['window-actions']}>
          <div className={styles['window-action-button']}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => router.back()}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles['profile']}>
        <List>
          <ProfileItem title={Locale.Profile.Username}>
            <input value={config.submitKey} onChange={(e) => {}} />
          </ProfileItem>

          <ListItem>
            <div className={styles['profile-title']}>
              {Locale.Settings.Theme}
            </div>
            <select
              value={config.theme}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.theme = e.target.value as any as Theme),
                );
              }}
            >
              {Object.values(Theme).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </ListItem>

          <ProfileItem title={Locale.Settings.Lang.Name}>
            <div className="">
              <select
                value={getLang()}
                onChange={(e) => {
                  changeLang(e.target.value as any);
                }}
              >
                <option value="en" key="en">
                  {Locale.Settings.Lang.Options.en}
                </option>

                <option value="cn" key="cn">
                  {Locale.Settings.Lang.Options.cn}
                </option>
              </select>
            </div>
          </ProfileItem>

          <ProfileItem title={Locale.Settings.TightBorder}>
            <input
              type="checkbox"
              checked={config.tightBorder}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.tightBorder = e.currentTarget.checked),
                );
              }}
            ></input>
          </ProfileItem>
        </List>
      </div>
    </>
  );
}