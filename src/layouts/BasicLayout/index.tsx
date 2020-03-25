import React from 'react';
import { Shell } from '@alifd/next';
import { BackTop } from 'antd';
import PageNav from './components/PageNav';
import GlobalSearch from './components/GlobalSearch';
import Notice from './components/Notice';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Footer from './components/Footer';

export default function BasicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell
      type="dark"
      style={{
        height: '100vh'
      }}
    >
      <Shell.Branding>
        <Logo
          image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
          text="Logo"
        />
      </Shell.Branding>
      <Shell.Navigation
        direction="hoz"
        style={{
          marginRight: 10
        }}
      >
        <GlobalSearch />
      </Shell.Navigation>
      <Shell.Action>
        <Notice />
        <HeaderAvatar />
      </Shell.Action>
      <Shell.Navigation>
        <PageNav />
      </Shell.Navigation>

      <Shell.Content className="contentBox">
        {children}
        <BackTop
          target={() => {
            const rao = document.querySelector('.contentBox');
            return (rao && rao.parentNode) || document.body;
          }}
        />
      </Shell.Content>
      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}
