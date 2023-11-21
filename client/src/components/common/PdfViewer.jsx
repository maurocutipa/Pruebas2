/* eslint-disable react/prop-types */
import { Viewer, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const PdfViewer = ({ url, height = 600 }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar } = toolbarPluginInstance;

  const transform = (slot) => ({
    ...slot,
    EnterFullScreen: () => <></>,
    Print: () => <></>,
    Open: () => <></>,
  });

  const renderToolbar = (Toolbar) => (
    <div>
      <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    </div>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar,
  });

  return (
    <div style={{ height: `${height}px` }}>
      <Viewer
        defaultScale={SpecialZoomLevel.ActualSize}
        scrollMode={ScrollMode.Vertical}
        fileUrl={url}
        plugins={[defaultLayoutPluginInstance]}
        localization={es_ES}
      />
    </div>
  );
};
