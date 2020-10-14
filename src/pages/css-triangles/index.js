/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useRef } from 'react'
import { startCase, includes } from 'lodash'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { useCopyToClipboard, useClickAway, useLocalStorage } from 'react-use'

import Head from '../../components/head'
import Nav from '../../components/nav'
import {
  IconArrowUp,
  IconLink,
  IconColorSwatch,
  IconClipboardCopy,
  IconRefresh,
  IconTwitter,
} from '../../lib/icons'

const isBrowser = typeof window !== 'undefined'

const INITIAL_TRIANGLE_STATE = {
  direction: 'top',
  type: 'isosceles',
  color: '#ff0000',
  output: 'css',
  values: {
    width: '200',
    left: '100',
    right: '100',
    height: '100',
    top: '50',
    bottom: '50',
  },
}

const CssTrianglesWidget = () => {
  if (!isBrowser) return null

  const [triangleState, setTriangleStateHandler] = useLocalStorage(
    'triangle-settings',
    INITIAL_TRIANGLE_STATE,
  )

  const setTriangleState = (state) => {
    setTriangleStateHandler({
      ...triangleState,
      ...state,
    })
  }

  const isOrthogonalDirection =
    triangleState.direction == 'top' ||
    triangleState.direction == 'right' ||
    triangleState.direction == 'bottom' ||
    triangleState.direction == 'left'

  const composedState = triangleState.direction + startCase(triangleState.type)

  const beautifyString = (str) => {
    return str.replace(/^\s+/gm, '')
  }

  const demoTriangleStyles = templatesTable[composedState](
    triangleState.values,
    triangleState.color,
    'css',
  )

  const resultCode = beautifyString(
    templatesTable[composedState](
      triangleState.values,
      triangleState.color,
      triangleState.output,
    ),
  )

  return (
    <>
      <Head title="🔺 CSS triangles" />
      <div className="w-screen min-h-screen flex flex-col items-center">
        <Nav />
        <div className="w-full flex flex-col items-center my-4 md:my-6 lg:my-10">
          <h1 className="flex-shrink-0 font-medium text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-10 lg:mb-12 text-center flex items-baseline py-1 px-3 bg-white">
            CSS tri
            <TitleTriangle color={triangleState.color} className="mx-px" />
            ngle gener
            <TitleTriangle color={triangleState.color} className="mx-px" />
            tor
          </h1>
          <div className="w-full max-w-sm md:max-w-5xl px-4 md:px-6 grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BlockWrapper title="Set the direction" centered>
              <TriangleDirectionControl
                triangleState={triangleState}
                setTriangleState={setTriangleState}
              />
            </BlockWrapper>
            <BlockWrapper
              title="Look at result"
              centered
              triangleColor={triangleState.color}
              setTriangleState={setTriangleState}
              resetButton
            >
              <TriangleDemo computedStyles={demoTriangleStyles} />
            </BlockWrapper>
            <BlockWrapper>
              <div className="w-full">
                <h3 className="font-medium w-full text-lg mb-4 leading-none">
                  Set type:
                </h3>
                <TriangleTypeControl
                  isOrthogonalDirection={isOrthogonalDirection}
                  triangleState={triangleState}
                  setTriangleState={setTriangleState}
                />
              </div>
              <div className="w-full">
                <h3 className="font-medium w-full text-lg mb-4 leading-none">
                  Set size:
                </h3>
                <SizesFields
                  fieldsTable={fieldsTable}
                  composedState={composedState}
                  isOrthogonalDirection={isOrthogonalDirection}
                  triangleState={triangleState}
                  setTriangleState={setTriangleState}
                />
              </div>
              <div className="w-full">
                <h3 className="font-medium w-full text-lg mb-4 leading-none">
                  Set color (HEX):
                </h3>
                <ColorpickerFields
                  triangleColor={triangleState.color}
                  setTriangleState={setTriangleState}
                />
              </div>
            </BlockWrapper>

            <BlockWrapper title="Grab the result">
              <ResultCodeOutput
                resultCode={resultCode}
                output={triangleState.output}
                setTriangleState={setTriangleState}
              />
              <CopyToClipboard stringToCopy={resultCode} className="ml-4" />
            </BlockWrapper>
          </div>
          <div className="mt-16">
            <a
              id="tweet-it-button"
              className="flex items-center rounded p-2 bg-gray-200 hover:bg-gray-400 transition-colors ease-in-out duration-150"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(
                '🦖 Generaptors: CSS triangle generator',
              )}&url=${encodeURIComponent(
                'https://generaptors.com/css-triangles',
              )}`}
            >
              <IconTwitter className="w-5 mr-2" />
              <span>Tweet</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default CssTrianglesWidget

const fieldsTable = {
  width: [
    'topEquilateral',
    'topIsosceles',
    'topRightIsosceles',
    'topRightScalene',
    'rightIsosceles',
    'rightScalene',
    'bottomRightIsosceles',
    'bottomRightScalene',
    'bottomEquilateral',
    'bottomIsosceles',
    'bottomLeftIsosceles',
    'bottomLeftScalene',
    'leftIsosceles',
    'leftScalene',
    'topLeftIsosceles',
    'topLeftScalene',
  ],
  left: ['topScalene', 'bottomScalene'],
  right: ['topScalene', 'bottomScalene'],
  height: [
    'topIsosceles',
    'topScalene',
    'topRightIsosceles',
    'topRightScalene',
    'rightEquilateral',
    'rightIsosceles',
    'bottomRightIsosceles',
    'bottomRightScalene',
    'bottomIsosceles',
    'bottomScalene',
    'bottomLeftIsosceles',
    'bottomLeftScalene',
    'leftEquilateral',
    'leftIsosceles',
    'topLeftIsosceles',
    'topLeftScalene',
  ],
  top: ['rightScalene', 'leftScalene'],
  bottom: ['rightScalene', 'leftScalene'],
}

const diagonalDirections = [
  {
    direction: 'topLeft',
    arrowClasses: '-translate-x-8 -translate-y-8 -rotate-45',
  },
  {
    direction: 'topRight',
    arrowClasses: 'translate-x-8 -translate-y-8 rotate-45',
  },
  {
    direction: 'bottomLeft',
    arrowClasses: '-translate-x-8 translate-y-8 rotate-225',
  },
  {
    direction: 'bottomRight',
    arrowClasses: 'translate-x-8 translate-y-8 rotate-135',
  },
]

const orthogonalDirections = [
  {
    direction: 'top',
    arrowClasses: '-translate-x-6 -translate-y-6 -rotate-45',
  },
  {
    direction: 'right',
    arrowClasses: 'translate-x-6 -translate-y-6 rotate-45',
  },
  {
    direction: 'left',
    arrowClasses: '-translate-x-6 translate-y-6 rotate-225',
  },
  {
    direction: 'bottom',
    arrowClasses: 'translate-x-6 translate-y-6 rotate-135',
  },
]

const outputCss = ({ w, c }) => {
  const dt = 'transparent'
  return `
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${w.t ? `${w.t}px` : 0} ${w.r ? `${w.r}px` : 0} ${
    w.b ? `${w.b}px` : 0
  } ${w.l ? `${w.l}px` : 0};
    border-color: ${c.t || dt} ${c.r || dt} ${c.b || dt} ${c.l || dt};
  `
}

const outputCssInJs = ({ w, c }) => {
  const dt = 'transparent'
  return `
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "${w.t ? `${w.t}px` : 0} ${w.r ? `${w.r}px` : 0} ${
    w.b ? `${w.b}px` : 0
  } ${w.l ? `${w.l}px` : 0}",
    borderColor: "${c.t || dt} ${c.r || dt} ${c.b || dt} ${c.l || dt}",
  `
}

const getIt = (values, output) => {
  let outputFunc = () => {}
  switch (output) {
    case 'css':
      outputFunc = outputCss
      break
    case 'css-in-js':
      outputFunc = outputCssInJs
      break
    default:
      outputFunc = outputCss
  }
  return outputFunc(values)
}

const templatesTable = {
  topEquilateral: (sizes, color, output) =>
    getIt(
      {
        w: {
          r: Math.round(sizes.width / 2),
          b: sizes.height,
          l: Math.round(sizes.width / 2),
        },
        c: { b: color },
      },
      output,
    ),
  topIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: {
          r: Math.round(sizes.width / 2),
          b: sizes.height,
          l: Math.round(sizes.width / 2),
        },
        c: { b: color },
      },
      output,
    ),
  topScalene: (sizes, color, output) =>
    getIt(
      {
        w: { r: sizes.right, b: sizes.height, l: sizes.left },
        c: { b: color },
      },
      output,
    ),
  topRightIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: { r: sizes.width, b: sizes.height },
        c: { r: color },
      },
      output,
    ),
  topRightScalene: (sizes, color, output) =>
    getIt(
      {
        w: { r: sizes.width, b: sizes.height },
        c: { r: color },
      },
      output,
    ),
  rightEquilateral: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: Math.round(sizes.height / 2),
          b: Math.round(sizes.height / 2),
          l: Math.round(
            Math.sqrt(
              Math.pow(sizes.height, 2) - Math.pow(sizes.height / 2, 2),
            ),
          ),
        },
        c: { l: color },
      },
      output,
    ),
  rightIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: Math.round(sizes.height / 2),
          b: Math.round(sizes.height / 2),
          l: sizes.width,
        },
        c: { l: color },
      },
      output,
    ),
  rightScalene: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.top, b: sizes.bottom, l: sizes.width },
        c: { l: color },
      },
      output,
    ),
  bottomRightIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: { b: sizes.height, l: sizes.width },
        c: { b: color },
      },
      output,
    ),
  bottomRightScalene: (sizes, color, output) =>
    getIt(
      {
        w: { b: sizes.height, l: sizes.width },
        c: { b: color },
      },
      output,
    ),
  bottomEquilateral: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: Math.round(
            Math.sqrt(Math.pow(sizes.width, 2) - Math.pow(sizes.width / 2, 2)),
          ),
          r: Math.round(sizes.width / 2),
          l: Math.round(sizes.width / 2),
        },
        c: { t: color },
      },
      output,
    ),
  bottomIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: sizes.height,
          r: Math.round(sizes.width / 2),
          l: Math.round(sizes.width / 2),
        },
        c: { t: color },
      },
      output,
    ),
  bottomScalene: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: sizes.height,
          r: Math.round(sizes.width / 2),
          l: Math.round(sizes.width / 2),
        },
        c: { t: color },
      },
      output,
    ),
  bottomLeftIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height, l: sizes.width },
        c: { l: color },
      },
      output,
    ),
  bottomLeftScalene: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height, l: sizes.width },
        c: { l: color },
      },
      output,
    ),
  leftEquilateral: (sizes, color, output) =>
    getIt(
      {
        w: {
          t: sizes.height / 2,
          r: Math.round(
            Math.sqrt(
              Math.pow(sizes.height, 2) - Math.pow(sizes.height / 2, 2),
            ),
          ),
          b: sizes.height / 2,
        },
        c: { r: color },
      },
      output,
    ),
  leftIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height / 2, r: sizes.width, b: sizes.height / 2 },
        c: { r: color },
      },
      output,
    ),
  leftScalene: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height / 2, r: sizes.width, b: sizes.height / 2 },
        c: { r: color },
      },
      output,
    ),
  topLeftIsosceles: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height, r: sizes.width },
        c: { t: color },
      },
      output,
    ),
  topLeftScalene: (sizes, color, output) =>
    getIt(
      {
        w: { t: sizes.height, r: sizes.width },
        c: { t: color },
      },
      output,
    ),
}

const BlockWrapper = ({
  children,
  title,
  centered,
  triangleColor,
  setTriangleState,
  resetButton,
}) => (
  <div className="bg-white rounded-md border border-gray-400 p-6 lg:p-6 flex flex-col items-center">
    {title && (
      <h3 className="font-medium w-full text-lg mb-3 leading-none flex justify-between items-center">
        <div>{title}:</div>
        {resetButton && (
          <button
            onClick={() => setTriangleState(INITIAL_TRIANGLE_STATE)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 text-sm duration-100 focus:outline-none"
          >
            <span>reset</span>
            <IconRefresh className="w-4" />
          </button>
        )}
      </h3>
    )}
    <div
      className={`w-full flex-grow space-y-6 rounded-md transition-colors duration-150 ${
        centered
          ? 'grid place-items-center'
          : 'flex flex-col justify-between items-center'
      } ${
        triangleColor === '#fff' || triangleColor === '#ffffff'
          ? 'bg-gray-100'
          : 'white'
      }`}
      css={{ minHeight: '200px' }}
    >
      {children}
    </div>
  </div>
)

const TriangleDirectionItem = ({
  item,
  isDiagonalDirectionButton,
  triangleState,
  setTriangleState,
}) => (
  <div
    key={`key-${item.direction}`}
    className={`cursor-pointer border border-gray-400 hover:text-gray-700 hover:bg-gray-300 transition-colors duration-75 grid place-items-center ${
      item.direction === triangleState.direction
        ? 'text-gray-700 bg-gray-300'
        : 'text-gray-500 bg-gray-100'
    }`}
    onClick={() => {
      setTriangleState({
        direction: item.direction,
        ...(triangleState.type === 'equilateral' &&
          isDiagonalDirectionButton && {
            type: 'isosceles',
            values: {
              ...triangleState.values,
              height: triangleState.values.width,
            },
          }),
        ...(triangleState.triangleType === 'isosceles' &&
          isDiagonalDirectionButton && {
            values: {
              ...triangleState.values,
              height: triangleState.values.width,
            },
          }),
      })
    }}
  >
    <IconArrowUp className={`w-6 transform ${item.arrowClasses}`} />
  </div>
)

const TriangleDirectionControl = ({ triangleState, setTriangleState }) => {
  return (
    <div className="relative py-8">
      <div className="grid grid-cols-2 grid-rows-2 w-64 h-64">
        {diagonalDirections.map((item) => (
          <TriangleDirectionItem
            key={`key-${item.direction}`}
            item={item}
            triangleState={triangleState}
            setTriangleState={setTriangleState}
            isDiagonalDirectionButton
          />
        ))}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 w-56 h-56 absolute left-0 top-0 right-0 bottom-0 m-auto transform rotate-45">
        {orthogonalDirections.map((item) => (
          <TriangleDirectionItem
            key={`key-${item.direction}`}
            item={item}
            triangleState={triangleState}
            setTriangleState={setTriangleState}
          />
        ))}
      </div>
      <div
        className="absolute left-0 top-0 right-0 bottom-0 m-auto bg-white border border-gray-400"
        css={{ width: '158px', height: '158px' }}
      />
    </div>
  )
}

const TriangleTypeControl = ({
  isOrthogonalDirection,
  triangleState,
  setTriangleState,
}) => {
  return (
    <form className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
      <label
        className={`flex items-center ${
          !isOrthogonalDirection
            ? 'opacity-25 cursor-default'
            : 'cursor-pointer'
        }`}
      >
        <input
          type="radio"
          id="type-equilateral"
          name="triangleType"
          value="equilateral"
          onChange={(e) =>
            setTriangleState({
              type: e.target.value,
            })
          }
          checked={
            triangleState.type === 'equilateral' && isOrthogonalDirection
          }
          disabled={!isOrthogonalDirection}
        />
        <span className="ml-1">Equilateral</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          id="type-isosceles"
          name="triangleType"
          value="isosceles"
          onChange={(e) => {
            setTriangleState({
              type: e.target.value,
              values: {
                ...triangleState.values,
                height: triangleState.values.width,
              },
            })
          }}
          checked={triangleState.type === 'isosceles'}
        />
        <span className="ml-1">Isosceles</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          id="type-scalene"
          name="triangleType"
          value="scalene"
          onChange={(e) =>
            setTriangleState({
              type: e.target.value,
            })
          }
          checked={triangleState.type === 'scalene'}
        />
        <span className="ml-1">Scalene</span>
      </label>
    </form>
  )
}

const SizesFields = ({
  fieldsTable,
  composedState,
  isOrthogonalDirection,
  triangleState,
  setTriangleState,
}) => {
  return (
    <form className="relative flex flex-col">
      <div
        className="absolute border border-dashed border-gray-500 h-5"
        css={{
          top: '-10px',
          left: '108px',
          width: '158px',
          display:
            triangleState.type === 'isosceles' && !isOrthogonalDirection
              ? 'block'
              : 'none',
        }}
      >
        <div
          className="absolute left-0 right-0 m-auto w-6 px-1 bg-white text-gray-600"
          css={{ top: '-0.5rem' }}
        >
          <IconLink className="w-4" />
        </div>
      </div>
      <div
        className="w-full space-y-2 relative z-10 block bg-white"
        css={{ columns: 2, maxWidth: '298px' }}
      >
        {Object.keys(triangleState.values).map((item) => {
          let widthOrHeight = ''
          if (triangleState.type === 'isosceles' && !isOrthogonalDirection) {
            switch (item) {
              case 'width':
                widthOrHeight = 'height'
                break
              case 'height':
                widthOrHeight = 'width'
                break
              default:
                widthOrHeight = ''
            }
          }
          return (
            <label
              key={`field-${item}`}
              className={`flex justify-end items-center bg-white z-10 relative ${
                includes(fieldsTable[item], composedState) ? '' : 'opacity-25'
              }`}
            >
              <span className="mr-3">{`${startCase(item)}:`}</span>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={triangleState.values[item]}
                max="200"
                min="1"
                onChange={(e) => {
                  setTriangleState({
                    values: {
                      ...triangleState.values,
                      [item]: e.target.value,
                      ...(widthOrHeight && {
                        [widthOrHeight]: e.target.value,
                      }),
                    },
                  })
                }}
                disabled={!includes(fieldsTable[item], composedState)}
                className="w-16 md:w-20 flex-shrink-0 appearance-none rounded p-2 transition-colors duration-150 border border-gray-400 focus:outline-none"
              />
            </label>
          )
        })}
      </div>
    </form>
  )
}

const ColorpickerFields = ({ triangleColor, setTriangleState }) => (
  <div className="flex justify-between items-end w-full space-x-10">
    <div className="flex flex-col">
      <HexColorInput
        color={triangleColor}
        onChange={(e) =>
          setTriangleState({
            color: e,
          })
        }
        className="appearance-none w-32 rounded p-2 transition-colors duration-150 border border-gray-400 focus:outline-none"
      />
    </div>
    <div className="flex flex-col">
      <ColorPickerButton
        triangleColor={triangleColor}
        onChange={(e) =>
          setTriangleState({
            color: e,
          })
        }
      />
    </div>
  </div>
)

const ColorPickerButton = ({ triangleColor, onChange }) => {
  const colorPickerRef = useRef(null)
  const [isShown, setIsShown] = useState(false)
  useClickAway(colorPickerRef, () => {
    setIsShown(false)
  })
  return (
    <div ref={colorPickerRef} className="relative">
      <button
        onClick={() => setIsShown(!isShown)}
        className={`rounded p-2 flex justify-center items-center hover:bg-gray-400 transition-colors duration-150 focus:outline-none ${
          isShown ? 'bg-gray-400' : 'bg-gray-200'
        }`}
      >
        <IconColorSwatch className="w-5" />
        <span className="ml-2">Colorpicker</span>
      </button>
      {isShown && (
        <div
          className="absolute right-0 bottom-0 z-10"
          css={{ bottom: '4rem' }}
        >
          <HexColorPicker color={triangleColor} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

const TriangleDemo = ({ computedStyles }) => (
  <div
    className="transition-all duration-50"
    css={css`
      ${computedStyles}
    `}
  />
)

const CopyToClipboard = ({ stringToCopy, ...restProps }) => {
  if (stringToCopy) {
    const [copied, setCopied] = useState(false)
    const [state, copyToClipboard] = useCopyToClipboard()

    const copyHandler = () => {
      copyToClipboard(stringToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    return (
      <div {...restProps}>
        <button
          type="button"
          disabled={copied}
          onClick={copyHandler}
          className="rounded p-2 flex justify-center items-center bg-gray-200 hover:bg-gray-400 transition-colors duration-150 focus:outline-none"
          style={{ minWidth: '210px' }}
        >
          {state.error ? (
            'Unable to copy!'
          ) : copied ? (
            'Copied!'
          ) : (
            <>
              <IconClipboardCopy className="w-5 mr-2" />
              <span>Copy code to clipboard</span>
            </>
          )}
        </button>
      </div>
    )
  }
  return null
}

const TitleTriangle = ({ color, ...restProps }) => {
  return (
    <span
      className="transition-all duration-150"
      css={{
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 15px 26px 15px',
        borderColor: `transparent transparent ${color} transparent`,
      }}
      {...restProps}
    />
  )
}

const ResultCodeOutput = ({ resultCode, output, setTriangleState }) => (
  <div className="w-full">
    <textarea
      value={resultCode}
      readOnly
      className="h-48 font-mono text-sm appearance-none w-full resize-none text-md p-3 rounded transition-colors duration-150 border border-gray-400 focus:outline-none"
    />
    <OutputControl
      onChange={(e) =>
        setTriangleState({
          output: e.target.value,
        })
      }
      output={output}
    />
  </div>
)

const OutputControl = ({ onChange, output }) => (
  <form className="flex flex-row items-center space-x-4 mt-3">
    <label className="cursor-pointer flex items-center">
      <input
        type="radio"
        id="output-type-css"
        name="output-type"
        value="css"
        onChange={onChange}
        checked={output === 'css'}
      />
      <span className="ml-1">CSS</span>
    </label>
    <label className="cursor-pointer flex items-center">
      <input
        type="radio"
        id="output-type-css-in-js"
        name="output-type"
        value="css-in-js"
        onChange={onChange}
        checked={output === 'css-in-js'}
      />
      <span className="ml-1">CSS-in-JS</span>
    </label>
  </form>
)
