import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { SmallText } from "~/components/typo/SmallText";
import { Headline } from "~/components/typo/Headline";

export default function Privacy() {
  return (
    <main>
      <Title>ThreeA - Datenschutz</Title>

      <HeaderSimple />

      <FullWidth class="">
        <Headline>
          <h1 class="py-12">Datenschutzerklärung</h1>
        </Headline>
        <SmallText class="max-w-[500px] font-display mb-24">
          <p>
            Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz
            Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen.
            Nachfolgend informieren wir Sie ausführlich über die Erhebung,
            Verarbeitung und Nutzung Ihrer Daten im Rahmen der Nutzung unseres
            Kontaktformulars.
          </p>

          <h3>1. Verantwortlicher</h3>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
            ist:
          </p>

          <p>
            <strong>Nikolaj Sokolwoski</strong>
            <br />
            Am Heidbergbad 30
            <br />
            28717 Bremen
          </p>

          <h3>2. Erhobene Daten</h3>
          <p>
            Über unser Kontaktformular erheben wir folgende personenbezogene
            Daten:
          </p>
          <ul>
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Nachrichtentext</li>
          </ul>

          <h3>3. Zweck der Datenerhebung</h3>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verwenden wir
            ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme
            mit Ihnen. Die Daten werden nicht für andere Zwecke genutzt oder an
            Dritte weitergegeben, außer zum Versand der E-Mail über den externen
            Dienstleister (siehe Abschnitt 5).
          </p>

          <h3>4. Rechtsgrundlage</h3>
          <p>
            Die Verarbeitung Ihrer Daten erfolgt auf der Grundlage von Art. 6
            Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt darin,
            Anfragen von Interessenten, Kunden oder anderen Personen zu
            beantworten und zu diesem Zweck mit Ihnen in Kontakt zu treten.
          </p>

          <h3>5. Übermittlung an Dritte</h3>
          <p>
            Zum Versand der über das Kontaktformular gesendeten Nachrichten
            nutzen wir den E-Mail-Dienstleister <strong>Sendgrid</strong>{" "}
            (Twilio Inc.). Sendgrid verarbeitet die Daten ausschließlich zur
            Zustellung der E-Mail und agiert dabei als Auftragsverarbeiter gemäß
            Art. 28 DSGVO.
          </p>

          <p>
            <strong>Sendgrid</strong> hat seinen Sitz in den USA. Um ein
            angemessenes Datenschutzniveau zu gewährleisten, erfolgt die
            Übermittlung von Daten auf Grundlage von Standardvertragsklauseln
            gemäß Art. 46 Abs. 2 lit. c DSGVO. Weitere Informationen finden Sie
            in der{" "}
            <a
              href="https://www.twilio.com/en-us/legal/privacy#data-about-our-customers-end-users"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung von Sendgrid
            </a>
            .
          </p>

          <h3>6. Speicherdauer</h3>
          <p>
            Die über das Kontaktformular erhobenen Daten werden von uns nicht
            gespeichert, sondern lediglich zur Übermittlung der Nachricht an uns
            genutzt. Nach der Beantwortung Ihrer Anfrage werden die Daten
            gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>

          <h3>7. Ihre Rechte</h3>
          <p>
            Sie haben das Recht, jederzeit Auskunft über die bei uns
            gespeicherten personenbezogenen Daten zu verlangen (Art. 15 DSGVO).
            Darüber hinaus haben Sie das Recht auf Berichtigung (Art. 16 DSGVO),
            Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18
            DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO).
          </p>

          <p>
            Falls Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen
            Datenschutzrecht verstößt, haben Sie das Recht, bei einer
            Aufsichtsbehörde Beschwerde einzulegen (Art. 77 DSGVO).
          </p>

          <h3>8. Kontakt für Datenschutzanfragen</h3>
          <p>
            Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie
            sich jederzeit an uns wenden:
          </p>

          <p>
            <strong>Nikolaj Sokolowski</strong>
            <br />
            nikolaj@threea.io
          </p>
        </SmallText>
      </FullWidth>
    </main>
  );
}
