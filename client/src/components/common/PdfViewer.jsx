/* eslint-disable react/prop-types */
import { Viewer, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const renderPage = (props) => (
  <>
    {props.canvasLayer.children}
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '10px',
        maxHeight: '500px',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    ></div>
    {props.annotationLayer.children}
    {props.textLayer.children}
  </>
);

export const PdfViewer = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  return (
    <div style={{ height: '600px' }}>
      <Viewer
        defaultScale={SpecialZoomLevel.ActualSize}
        renderPage={renderPage}
        scrollMode={ScrollMode.Vertical}
        fileUrl={url}
        plugins={[defaultLayoutPluginInstance]}
        localization={es_ES}
      />
    </div>
  );
};
