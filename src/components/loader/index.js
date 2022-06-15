import React from 'react';
import {css} from "@emotion/react";
import {
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClipLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PropagateLoader,
    PuffLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SyncLoader,
} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
//     TYPES ===
//     bar,
//     beat,
//     bounce,
//     circle,
//     clip,
//     dot,
//     puff,
//     propagate,
//     clock,
//     fade,
//     grid,
//     hash,
//     moon,
//     pulse,
//     rise,
//     rotate,
//     scale,
//     sync,


const Loader = (
    {
        loading,
        css,
        size,
        color = '#4ad9ca',
        type = 'propagate',
        containerWidth,
        containerHeight,
        height,
        width,
        radius,
        margin
    }
) => {
    return (
        <div className="loader" style={{height: containerHeight}}>
            <div className="loader__inner">
                {type == 'bar' &&
                <BarLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                           radius={radius} margin={margin}/>
                }
                {type == 'beat' &&
                <BeatLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'bounce' &&
                <BounceLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                              radius={radius} margin={margin}/>
                }
                {type == 'circle' &&
                <CircleLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                              radius={radius} margin={margin}/>
                }
                {type == 'clip' &&
                <ClipLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'dot' &&
                <DotLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                           radius={radius} margin={margin}/>
                }
                {type == 'puff' &&
                <PuffLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'propagate' &&
                <PropagateLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                                 radius={radius} margin={margin}/>
                }
                {type == 'clock' &&
                <ClockLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                             radius={radius} margin={margin}/>
                }
                {type == 'fade' &&
                <FadeLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'grid' &&
                <GridLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'hash' &&
                <HashLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'moon' &&
                <MoonLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'pulse' &&
                <PuffLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'rise' &&
                <RiseLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
                {type == 'rotate' &&
                <RotateLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                              radius={radius} margin={margin}/>
                }
                {type == 'scale' &&
                <ScaleLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                             radius={radius} margin={margin}/>
                }
                {type == 'sync' &&
                <SyncLoader color={color} loading={loading} css={css} size={size} height={height} width={width}
                            radius={radius} margin={margin}/>
                }
            </div>
        </div>
    );
}

export default Loader;