import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { translateValue } from "../../utils/valueList";
import "./KeySeparatorList.scss";
import { chosenKeyListHandle } from "../../redux/actions/keySeparatorListActions";
import {selectKeySeparatorList} from "../../redux/selectors/keySeparatorListSelectors";

export const KeySeparatorList = () => {

    const dispatch = useDispatch();
    const keyTypeList = useSelector(selectKeySeparatorList);

    const chosenKeyHandle = (isPickedUp, keyType, key) => {
      dispatch(
        chosenKeyListHandle({
          isPickedUp: isPickedUp,
          keyType: keyType,
          key: key,
        })
      );
    };

    return (
        <div className="key-separators">{
            keyTypeList.map((keyType) => (
                <div className="keyItem">
                    <span className="keyType">{translateValue(keyType.type, "KEY_TYPE")}</span>
                    {keyType.formatters.map((formatter) => (
                        <div className={classNames("key", formatter.isPickedUp ? "picked-up" : "not-picked")}>
                            <span >{formatter.value}</span>
                            <div className="btn" id={formatter.value} onClick={() => chosenKeyHandle(!formatter.isPickedUp, keyType.type, formatter.value)}/>
                        </div>
                    ))}
                </div>
            ))
        }</div>
    )
};
