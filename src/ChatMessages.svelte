<script>
  import { supabase } from "./db.js";
  import { messages, user } from "./store.js";

  function humanizeDate(dateISOstr) {
    const d = new Date(dateISOstr);
    const ye = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("fr", { month: "numeric" }).format(d);
    const da = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(d);
    return `${da}/${mo}/${ye}`;
  }

  const mess = supabase
    .from("messages")
    .on("INSERT", (payload) => {
      if (payload.new.user != $user.id) {
        $messages = [payload.new, ...$messages];
      }
    })
    .subscribe();
</script>

<style>
  .chat-messages {
    display: flex;
    flex-direction: column-reverse;
    border: 1px solid #ededed;
    border-radius: 10px;
    padding: 30px 15px;
    height: 200px;
    overflow-y: scroll;
  }

  .chat-messages-message-wrapper {
    text-align: right;
  }

  .chat-messages-message-wrapper.chat-message-me {
    text-align: left;
  }

  .chat-messages-message {
    display: inline-block;
    background-color: #ededff;
    padding: 20px 10px;
    border-radius: 10px;
    margin-bottom: 5px;
  }

  .chat-message-me .chat-messages-message {
    background-color: #edffed;
  }

  .chat-messages-message-text {
    padding-bottom: 10px;
  }

  .chat-messages-message-infos {
    border-top: 1px solid #ededed;
    padding-top: 10px;
    display: flex;
    width: 100%;
    font-size: 80%;
    color: #313131;
    justify-content: space-between;
  }

  .chat-messages-message-user {
    font-weight: bold;
    padding-right: 30px;
  }
</style>

<div class="chat-messages">
  {#each $messages as mes}
    <div
      class="chat-messages-message-wrapper"
      class:chat-message-me={$user.id == mes.user}>
      <div class="chat-messages-message">
        <div class="chat-messages-message-text">{mes.message}</div>
        <div class="chat-messages-message-infos">
          <div class="chat-messages-message-user">{mes.user}</div>
          <div class="chat-messages-message-date">{humanizeDate(mes.date)}</div>
        </div>
      </div>
    </div>
  {/each}
</div>
