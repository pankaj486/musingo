import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa";

import "./TermsAndConditions.scss";
import { PrivateLessonCreate } from "../../../../../generated/apiFetchers";

export type TermsAndConditionsProps = {
  formData: Partial<PrivateLessonCreate>;
  hasBorder: boolean;
  onChange: (newValue: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  formData,
  hasBorder,
  onChange,
  onSubmit,
}) => {
  const checkbox = useRef<HTMLInputElement>(null);
  return (
    <div className="terms-and-conditions-container">
      <h1 className="terms-and-conditions__header">
        AGB’s für dich als Anbieter
      </h1>
      <div
        className={`terms-and-conditions__highlights-container ${
          hasBorder ? "has-border" : ""
        }`}
      >
        <div className="terms-and-conditions__highlights">
          <span>Highlights</span>
          <ul className="highlights__list">
            <li>
              Musingoo Schüler dürfen ausschließlichzum Zwecke der auf Musingoo
              gebuchten.
            </li>
            <li>
              Services gebucht werden, sonst Vertragsstrafe von 5.000,00€.
            </li>
            <li>
              Du bist für deine Sozialversicherungsbeiträge sowie Meldung beim
              Finanzamt <br />
              selbst verantwortlich.
            </li>
            <li>
              Musingoo kommt weder für Sachschäden und Personenschäden auf.
            </li>
            <li>
              Du erhältst deine Honorare entsprechend nach Vollendung deines
              Angebotes zum <br />
              Ende eines Monats.
            </li>
          </ul>
        </div>

        <hr />

        <div className="terms">
          <p>
            This world is one of such pervasive systems of control and
            interpretation that there is simply no way for John to break free
            into an assertion of mere individuality in the final movement of the
            film, no matter what he intends or does. Personal intention counts
            for little or nothing in this world (perhaps as little as it counts
            for in a modern bureaucracy). The machine inscribes individuals
            within its own alternative "intentional" structure, independent of
            their will or wishes. It gives their acts meanings and values beyond
            their personal knowledge or control. How radically and profoundly at
            odds this is with the traditional Hollywood film, grounded in its
            sentimental post-Romantic exaltation of the autonomous ego, needs no
            comment. Doe makes his way through the crowd in the stadium to the
            stage, only minutes ahead of Norton's men, who are determined to
            stop him. Many of the shots of the convention are deliberately not
            direct shots of John or of the crowd but are shots of others–for
            example, radio announcers–looking at and describing John or the
            crowd to us and to their listeners. That is one of the things it
            means to say that experience is always repressively mediated in this
            world. The alternation of close-up shots with shots from the radio
            booth and the use of a layered sound track remind us that these
            contents are always contained. Both the visual and the acoustic
            effects are presented as layer after layer of packaging and
            merchandising. We are reminded of how the human figure and voice
            exist here only insofar as they are transmittable by a technology of
            information processing. In this study of visual and acoustic
            "perspectives" (in both the cinematic and the Nietzschean sense),
            events acquire significance only insofar as they are put in
            perspective'' by these technologies. John is only a step ahead of
            Norton's henchmen, and every second counts, but even once he has
            pushed his way through the crowd and arrived on stage he cannot
            speak. He has to wait for the ovation greeting him to die down. Then
            a patriotic anthem has to be sung. Then a minister rises to offer
            the benediction and a silent prayer for "all of the John Does in the
            world." Crowds of people, a national anthem, a prayer: The film
            metaphorically equates the hordes of ordinary citizens, the state,
            and the church as cooperating, interlocking forms of repression. All
            three are surrogates for and extensions of the moral, intellectual,
            and social repressiveness that Norton and his storm troopers
            represent. They keep John from speaking just as effectively as
            Norton does. Just as he is finally about to speak, Norton and his
            men arrive and move into action. They are at least as adept at the
            technologies of control as are society, the church, and the state.
            Newspapers denouncing him as an impostor have been printed up in
            advance, just in case of this eventuality. Cries are sent up by
            stooges in the audience to shout John down, and the instant he
            begins to speak and to accuse Norton from the stage, in the final
            coup de grace, the wires to the amplifiers are cut.
          </p>
        </div>
        <div className="accept-conditions-section">
          <input
            type={"checkbox"}
            checked={formData.accept_tos || false}
            ref={checkbox}
            onChange={() =>
              onChange({
                accept_tos: !formData.accept_tos,
              })
            }
          />
          <div
            className="accept-conditions-checkbox"
            onClick={() => checkbox.current?.click()}
          >
            {formData.accept_tos ? <FaCheck /> : null}
          </div>
          <span onClick={() => checkbox.current?.click()}>
            Accept the terms and conditions and the privacy policy
          </span>
        </div>
        <button
          className="accept-and-continue-cta"
          onClick={formData.accept_tos ? () => onSubmit() : () => {}}
          style={{
            backgroundColor: `${formData.accept_tos ? "#4ad9ca" : "#d6d5d5"}`,
          }}
        >
          <span>Zustimmen und weiter</span>
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
