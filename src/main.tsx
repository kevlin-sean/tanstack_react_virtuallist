import * as React from "react";
import { createRoot } from "react-dom/client";
import { faker } from "@faker-js/faker";

import { useVirtualizer, } from "@tanstack/react-virtual";

import "./index.css";

const randomNumber = (min: number, max: number) =>
  faker.number.int({ min, max });

const sentences = new Array(300)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

const list = new Array(100).fill(true).map(() => faker.lorem.sentence(randomNumber(20, 70)));

function RowVirtualizerDynamic() {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [enabled] = React.useState(true);

  const count = sentences.length;

  const itemRef = React.useRef<HTMLDivElement>(null);

  const height = itemRef.current?.offsetHeight || 0;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    enabled,
    scrollMargin: height,
  });

  const items = virtualizer.getVirtualItems();

  const listVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    enabled,
  });

  const listItems = listVirtualizer.getVirtualItems();

  return (
    <div>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: 600,
          width: 400,
          overflowY: "auto",
          contain: "strict",
        }}
      >


        <div style={{
          height: virtualizer.getTotalSize() + listVirtualizer.getTotalSize(),
        }}>


          <div
            style={{
              height: listVirtualizer.getTotalSize(),
              position: "relative",
            }}
            ref={itemRef}
          >
            {listItems.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={listVirtualizer.measureElement}
                className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
                style={{
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                <div style={{ padding: "10px 0" }}>
                  <div>Row {virtualRow.index}</div>
                  <div>{sentences[virtualRow.index]}</div>
                </div>
              </div>
            ))}

          </div>
          <div>🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀111111</div>
          <div style={{
            position: 'relative',
          }}>
            <div style={{
              overflow: 'hidden',
              width: '100%',
              boxSizing: 'border-box',
              transform: `translateY(${(items[0]?.start ?? 0) - height}px)`,
            }}>
              {items.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className={
                    virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                  }
                >
                  <div style={{ padding: "10px 0" }}>
                    <div>Row {virtualRow.index}</div>
                    <div>{sentences[virtualRow.index]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const pathname = location.pathname;
  return (
    <div>
      {(() => {
        switch (pathname) {
          case "/":
            return <RowVirtualizerDynamic />;
        }
        return <RowVirtualizerDynamic />;
      })()}
      <br />
      <br />
    </div>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
const { StrictMode } = React;

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
