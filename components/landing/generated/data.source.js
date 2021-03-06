import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children:
      'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '/login',
          children: [
            {
              children: (
                <span>
                  <p>Login</p>
                </span>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item3',
        className: 'header3-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <span>
                  <p>Register</p>
                </span>
              ),
              name: 'text',
            },
          ],
        },
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Banner40DataSource = {
  wrapper: { className: 'home-page-wrapper banner4' },
  page: { className: 'home-page banner4-page' },
  childWrapper: {
    className: 'banner4-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <span>
              <p>Periodic API testing</p>
            </span>
          </span>
        ),
        className: 'banner4-title klnyfpqhcqs-editor_css',
      },
      {
        name: 'content',
        className: 'banner4-content klnyfxx9yyd-editor_css',
        children: (
          <span>
            <span>
              <p>Know when things break before your customers do</p>
            </span>
          </span>
        ),
      },
      {
        name: 'button',
        children: {
          href: '#',
          type: 'primary',
          children: (
            <span>
              <span>
                <span>
                  <p>Start for free</p>
                </span>
              </span>
            </span>
          ),
          className: 'klnyjnakja7-editor_css',
        },
        className: 'klnyjwul4pa-editor_css',
      },
      {
        name: 'content~klnyk6vx0d',
        className: 'klnyk80ca3-editor_css',
        children: (
          <span>
            <p>No credit card required</p>
          </span>
        ),
      },
    ],
  },
  image: {
    className: 'banner4-image',
    children: 'https://crontests.s3.amazonaws.com/images/app.png',
  },
};
export const Feature00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <p>3 Simple Steps</p>
          </span>
        ),
      },
    ],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: 'https://flowoid.com/logos/http.svg',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>HTTP Request</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>Set an HTTP Request for your API endpoint.</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: '/images/assertions.svg',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <span>
                    <span>
                      <p>Assertions</p>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <p>
                        Set a list of assertions that must be meet for the API
                        to be successful.
                      </p>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children: '/images/failures.svg',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>Actions on Failure</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <p>
                      Set a list of actions that we should do if your assertions
                      fail.
                    </p>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Pricing20DataSource = {
  wrapper: { className: 'home-page-wrapper pricing2-wrapper' },
  page: { className: 'home-page pricing2' },
  OverPack: { playScale: 0.3, className: 'pricing2-content-wrapper' },
  titleWrapper: {
    className: 'pricing2-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <p>Pricing</p>
          </span>
        ),
        className: 'pricing2-title-h1',
      },
    ],
  },
  Table: {
    name: 'tabsTitle',
    size: 'default',
    className: 'pricing2-table',
    columns: {
      children: [
        {
          dataIndex: 'name',
          key: 'name',
          name: 'empty',
          childWrapper: {
            children: [
              { name: 'name', children: ' ' },
              { name: 'content', children: ' ' },
            ],
          },
        },
        {
          dataIndex: 'free',
          key: 'free',
          name: 'free',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: 'Free',
              },
              {
                name: 'content',
                className: 'pricing2-table-money',
                children: (
                  <span>
                    <span>
                      <p>$0</p>
                    </span>
                  </span>
                ),
              },
              {
                name: 'button',
                children: {
                  href: '#',
                  children: (
                    <span>
                      <span>
                        <p>Get started</p>
                      </span>
                    </span>
                  ),
                },
              },
            ],
          },
        },
        {
          dataIndex: 'pro',
          key: 'pro',
          name: 'pro',
          childWrapper: {
            className: 'pricing2-table-name-block',
            children: [
              {
                name: 'name',
                className: 'pricing2-table-name',
                children: 'Pro',
              },
              {
                name: 'content',
                className: 'pricing2-table-money klnz01fhrue-editor_css',
                children: (
                  <span>
                    <span>
                      <span>
                        <span>
                          <p>Free while in beta. Then $19.99</p>
                        </span>
                      </span>
                    </span>
                  </span>
                ),
              },
              {
                name: 'button',
                children: {
                  href: '#',
                  type: 'primary',
                  children: (
                    <span>
                      <p>Get started</p>
                    </span>
                  ),
                },
              },
            ],
          },
        },
      ],
    },
    dataSource: {
      children: [
        {
          name: 'list0',
          children: [
            {
              className: 'pricing2-table-content-name',
              name: 'name',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>Requests</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              children: (
                <span>
                  <p>1,000 / month</p>
                </span>
              ),
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              children: (
                <span>
                  <p>20,000 / month</p>
                </span>
              ),
              name: 'content2',
              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list1',
          children: [
            {
              className: 'pricing2-table-content-name',
              name: 'name',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>1,000 extra requests</p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              children: (
                <span>
                  <span>
                    <span>
                      <p>
                        N/A<br />
                      </p>
                    </span>
                  </span>
                </span>
              ),
              name: 'content0',
              className: 'pricing2-table-content',
            },
            {
              children: (
                <span>
                  <span>
                    <p>$1</p>
                  </span>
                </span>
              ),
              name: 'content2',
              className: 'pricing2-table-content',
            },
          ],
        },
        {
          name: 'list2',
          children: [
            {
              className: 'pricing2-table-content-name',
              name: 'name',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <p>Maximum active scenarios</p>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content0',
              children: (
                <span>
                  <span>
                    <span>
                      <p>3</p>
                    </span>
                  </span>
                </span>
              ),
              className: 'pricing2-table-content',
            },
            {
              name: 'content2',
              children: (
                <span>
                  <span>
                    <span>
                      <p>Unlimited</p>
                    </span>
                  </span>
                </span>
              ),
              className: 'pricing2-table-content',
            },
          ],
        },
      ],
    },
  },
};
export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        ©2018 <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved
      </span>
    ),
  },
};
