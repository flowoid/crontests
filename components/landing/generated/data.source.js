import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children: 'https://crontests.com/images/logo.svg',
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
          href: '/register',
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
  wrapper: { className: 'home-page-wrapper banner4 kmaoxn4d06c-editor_css' },
  page: { className: 'home-page banner4-page' },
  childWrapper: {
    className: 'banner4-title-wrapper kmaouyf94h-editor_css',
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
              <span>
                <span>
                  <span>
                    <p>
                      Know when things break before your customers do. No code
                      is needed.
                    </p>
                  </span>
                </span>
              </span>
            </span>
          </span>
        ),
      },
      {
        name: 'button',
        children: {
          href: '/register',
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
    className: 'banner4-image kmaovlk51bh-editor_css',
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
              children: 'https://crontests.com/images/assertions.svg',
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
              children: 'https://crontests.com/images/failures.svg',
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
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children: 'https://crontests.com/images/logo.svg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>
                          Periodic API testing platform.<br />
                          <span>
                            Know when things break before your customers do.
                          </span>
                        </p>
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
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <p>Follow Us</p>
            </span>
          ),
        },
        childWrapper: {
          children: [
            {
              name: 'link0',
              href: 'https://twitter.com/crontests',
              children: (
                <span>
                  <span>
                    <span>
                      <p>Twitter</p>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'link1',
              href: 'https://www.facebook.com/crontests',
              children: (
                <span>
                  <p>Facebook</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <p>Information</p>
            </span>
          ),
        },
        childWrapper: {
          children: [
            {
              href: '/legal/privacy',
              name: 'link0',
              children: (
                <span>
                  <p>Privacy</p>
                </span>
              ),
            },
            {
              href: '/legal/terms',
              name: 'link1',
              children: (
                <span>
                  <p>Terms</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <p>Get in touch</p>
            </span>
          ),
        },
        childWrapper: {
          children: [
            {
              href: 'https://github.com/flowoid/crontests/issues',
              name: 'link0',
              children: (
                <span>
                  <p>Feature Requests</p>
                </span>
              ),
            },
            {
              href: 'mailto:admin@crontests.com',
              name: 'link1',
              children: (
                <span>
                  <p>Email</p>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        CronTests by <a href="https://flowoid.com">Flowoid</a>
        <br />
      </span>
    ),
  },
};
