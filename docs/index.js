import React, { Fragment } from 'react'
import Snow from '../dist'
import { createGlobalStyle } from 'styled-components'

const Styles = createGlobalStyle`
  body {
    background: #0069ff;
  }

  article {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 1rem;
    text-align: center;
    color: white;
  }

  h1 {
    font-size: 4rem;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }

  nav a {
    margin: 1rem;
  }

  a {
    color: inherit;
    transition: color 0.125s ease-in-out;
    &:hover {
      color: #eee;
    }
  }
`

export default () => (
  <Fragment>
    <Styles />
    <Snow />
    <article>
      <h1>resnow</h1>
      <p>
        by <a href="https://lachlanjc.me">@lachlanjc</a>
      </p>
      <nav>
        <a href="https://github.com/lachlanjc/resnow">GitHub</a>
        <a href="https://npmjs.com/package/resnow">npm</a>
      </nav>
    </article>
  </Fragment>
)
