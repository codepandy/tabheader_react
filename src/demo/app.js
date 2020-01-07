import React from "react";
import TabHeader from "../index";

export default function App() {
  return (
    <div style={{ width: 500, marginTop: 50, marginLeft: 50 }}>
      <TabHeader
        defaultHead="abc"
        heardList={[
          { code: "abc", text: "较长的名字数量", num: "10" },
          { code: "abcd", text: "男人", num: "101" },
          { code: "abce1", text: "美女数", num: "0" },
        ]}
        onClickHeader={val => {
          console.log(val);
        }}
      />
    </div>
  );
}
